import http from 'node:http';
import crypto from 'node:crypto';
import { execSync } from 'node:child_process';

const SECRET = process.env.WEBHOOK_SECRET || '';
const PORT = parseInt(process.env.PORT || '3999', 10);
const PROJECT_DIR = '/opt/www-mxjxn';
const PREVIEW_DIR = '/opt/www-mxjxn-preview';

// GitHub times webhooks out at ~10s — builds here take 20-50s.
// So: verify signature, ACK 200 immediately, then build async.
const busy = { net: false, www: false, preview: false };

function verifySignature(payload, signature) {
  if (!SECRET || !signature) return true;
  const hmac = crypto.createHmac('sha256', SECRET);
  hmac.update(payload);
  const expected = `sha256=${hmac.digest('hex')}`;
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

function runAsync(label, siteKey, fn, res) {
  if (busy[siteKey]) {
    console.log(`[${new Date().toISOString()}] ${label} skipped — previous deploy still running`);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ queued: false, skipped: true, site: siteKey }));
    return;
  }
  busy[siteKey] = true;
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ queued: true, site: siteKey }));
  setImmediate(() => {
    try {
      fn();
      console.log(`[${new Date().toISOString()}] ${label} complete`);
    } catch (err) {
      console.error(`[${new Date().toISOString()}] ${label} FAILED:`, err.message);
    } finally {
      busy[siteKey] = false;
    }
  });
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  if (req.method !== 'POST') {
    res.writeHead(405);
    res.end('Method not allowed');
    return;
  }

  const chunks = [];
  req.on('data', chunk => chunks.push(chunk));
  req.on('end', () => {
    const body = Buffer.concat(chunks).toString();
    const sig = req.headers['x-hub-signature-256'];

    if (!verifySignature(body, sig)) {
      res.writeHead(403);
      res.end('Invalid signature');
      return;
    }

    let event;
    try {
      event = JSON.parse(body);
    } catch {
      res.writeHead(400);
      res.end('Invalid JSON');
      return;
    }

    const eventType = req.headers['x-github-event'];
    const repo = event.repository?.full_name || '';

    // Push to main (mxjxn.net) → pull, build, restart (systemd, not pm2)
    if (eventType === 'push' && repo === 'mxjxn/mxjxn.net' && event.ref === 'refs/heads/main') {
      console.log(`[${new Date().toISOString()}] mxjxn.net push to main — deploying...`);
      runAsync('mxjxn.net deploy', 'net', () => {
        execSync('cd /var/www/mxjxn.net && git pull origin main', { timeout: 30000, stdio: 'pipe' });
        execSync('cd /var/www/mxjxn.net && npm install --no-audit --no-fund', { timeout: 120000, stdio: 'pipe' });
        execSync('cd /var/www/mxjxn.net && npm run build', { timeout: 120000, stdio: 'pipe' });
        execSync('systemctl restart mxjxn-net', { timeout: 15000, stdio: 'pipe' });
      }, res);
      return;
    }

    // Push to main (www site) → build and deploy production
    if (eventType === 'push' && repo === 'mxjxn/www-mxjxn' && event.ref === 'refs/heads/main') {
      console.log(`[${new Date().toISOString()}] Push to main — building and deploying...`);
      runAsync('Production deploy', 'www', () => {
        execSync(`cd ${PROJECT_DIR} && git pull origin main`, { timeout: 30000, stdio: 'pipe' });
        execSync(`cd ${PROJECT_DIR} && npx astro build`, { timeout: 120000, stdio: 'pipe' });
        execSync(`rm -rf /var/www/www.mxjxn.com/client /var/www/www.mxjxn.com/server`, { timeout: 15000, stdio: 'pipe' });
        execSync(`rsync -av --delete --exclude='node_modules' --exclude='specs' ${PROJECT_DIR}/dist/ /var/www/www.mxjxn.com/`, { timeout: 30000, stdio: 'pipe' });
        execSync('pm2 restart www-mxjxn --update-env', { timeout: 15000, stdio: 'pipe' });
      }, res);
      return;
    }

    // Push to any other branch (www repo) → update preview
    if (eventType === 'push' && repo === 'mxjxn/www-mxjxn' && event.ref.startsWith('refs/heads/')) {
      const branch = event.ref.replace('refs/heads/', '');
      console.log(`[${new Date().toISOString()}] Push to branch "${branch}" — updating preview...`);
      runAsync(`Preview update for branch "${branch}"`, 'preview', () => {
        execSync(`cd ${PREVIEW_DIR} && git fetch origin ${branch}`, { timeout: 30000, stdio: 'pipe' });
        execSync(`cd ${PREVIEW_DIR} && git checkout ${branch}`, { timeout: 15000, stdio: 'pipe' });
        execSync(`cd ${PREVIEW_DIR} && git pull origin ${branch}`, { timeout: 30000, stdio: 'pipe' });
        execSync('pm2 restart www-mxjxn-preview --update-env', { timeout: 15000, stdio: 'pipe' });
      }, res);
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ignored: true, event: eventType, ref: event.ref }));
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Webhook server listening on 127.0.0.1:${PORT}`);
});
