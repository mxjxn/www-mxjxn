import http from 'node:http';
import crypto from 'node:crypto';
import { execSync } from 'node:child_process';

const SECRET = process.env.WEBHOOK_SECRET || '';
const PORT = parseInt(process.env.PORT || '3999', 10);
const PROJECT_DIR = '/opt/www-mxjxn';
const PREVIEW_DIR = '/opt/www-mxjxn-preview';

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

    // Push to main → deploy production
    if (eventType === 'push' && event.ref === 'refs/heads/main') {
      console.log(`[${new Date().toISOString()}] Push to main — deploying...`);
      try {
        execSync(`cd ${PROJECT_DIR} && git pull origin main`, { timeout: 30000, stdio: 'pipe' });
        execSync('pm2 restart www-mxjxn --update-env', { timeout: 15000, stdio: 'pipe' });
        console.log(`[${new Date().toISOString()}] Deploy complete`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ deployed: true }));
      } catch (err) {
        console.error(`[${new Date().toISOString()}] Deploy failed:`, err.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ deployed: false, error: err.message }));
      }
      return;
    }

    // Push to any other branch → update preview
    if (eventType === 'push' && event.ref.startsWith('refs/heads/')) {
      const branch = event.ref.replace('refs/heads/', '');
      console.log(`[${new Date().toISOString()}] Push to branch "${branch}" — updating preview...`);
      try {
        // Check if branch exists in preview clone, otherwise fetch it
        execSync(`cd ${PREVIEW_DIR} && git fetch origin ${branch}`, { timeout: 30000, stdio: 'pipe' });
        execSync(`cd ${PREVIEW_DIR} && git checkout ${branch}`, { timeout: 15000, stdio: 'pipe' });
        execSync(`cd ${PREVIEW_DIR} && git pull origin ${branch}`, { timeout: 30000, stdio: 'pipe' });
        execSync('pm2 restart www-mxjxn-preview --update-env', { timeout: 15000, stdio: 'pipe' });
        console.log(`[${new Date().toISOString()}] Preview updated for branch "${branch}"`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ preview: true, branch }));
      } catch (err) {
        console.error(`[${new Date().toISOString()}] Preview update failed:`, err.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ preview: false, error: err.message }));
      }
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ignored: true, event: eventType, ref: event.ref }));
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Webhook server listening on 127.0.0.1:${PORT}`);
});
