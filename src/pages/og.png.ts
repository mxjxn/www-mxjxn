import React from 'react';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import type { APIRoute } from 'astro';

const WIDTH = 1200;
const HEIGHT = 800;
const e = React.createElement;

// Cache fonts at module level
const [interBold, syneBold, spaceMono] = await Promise.all([
  fetch('https://bot.mxjxn.com/fonts/Inter-Bold.ttf').then(r => r.arrayBuffer()),
  fetch('https://bot.mxjxn.com/fonts/Syne-Bold.ttf').then(r => r.arrayBuffer()),
  fetch('https://img.mxjxn.com/fonts/SpaceMono-Regular.ttf').then(r => r.arrayBuffer()),
]);

// Cache images
const [avatarBuf, bgBuf] = await Promise.all([
  fetch('https://img.mxjxn.com/image/max-avatar.jpg').then(r => r.arrayBuffer()),
  fetch('https://img.mxjxn.com/blog/og-bg.jpg').then(r => r.arrayBuffer()),
]);

const avatarSrc = `data:image/jpeg;base64,${Buffer.from(avatarBuf).toString('base64')}`;
const bgSrc = `data:image/jpeg;base64,${Buffer.from(bgBuf).toString('base64')}`;

function readHero() {
  try {
    const raw = readFileSync('/opt/www-mxjxn/src/content/hero/index.yaml', 'utf-8');
    const lines = raw.split('\n');
    const result: Record<string, string> = {};
    let currentKey = '';
    let currentVal = '';
    for (const line of lines) {
      if (line.startsWith('  ') && currentKey) {
        currentVal += ' ' + line.trim();
      } else if (line.trim() === '' || line.trim().startsWith('#')) {
        continue;
      } else {
        if (currentKey) result[currentKey] = currentVal.trim();
        const idx = line.indexOf(':');
        if (idx > 0) {
          currentKey = line.slice(0, idx).trim();
          let val = line.slice(idx + 1).trim();
          // Strip YAML block scalar indicators (>, |, >-, |-)
          if (/^[>|][+-]?$/.test(val)) val = '';
          currentVal = val;
        }
      }
    }
    if (currentKey) result[currentKey] = currentVal.trim();
    return result as { tagline?: string; bio?: string; status?: string };
  } catch {
    return { tagline: 'artist · builder · agent orchestrator', bio: '', status: '' };
  }
}

export const GET: APIRoute = async () => {
  const hero = readHero();
  const tagline = hero.tagline ?? 'artist · builder · agent orchestrator';
  const bio = hero.bio ?? '';
  const status = hero.status ?? '';

  // 1200×800 has plenty of room — use full bio

  const element = e(
    'div',
    {
      style: {
        width: WIDTH,
        height: HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        fontFamily: 'Inter',
      },
    },
    // Background image
    e('img', {
      src: bgSrc,
      width: WIDTH,
      height: HEIGHT,
      style: { position: 'absolute', top: 0, left: 0, objectFit: 'cover' },
    }),
    // Dark gradient overlay
    e('div', {
      style: {
        position: 'absolute',
        top: 0, left: 0,
        width: WIDTH,
        height: HEIGHT,
        background: 'linear-gradient(180deg, rgba(8,8,14,0.25) 0%, rgba(8,8,14,0.55) 35%, rgba(8,8,14,0.8) 65%, rgba(8,8,14,0.93) 100%)',
      },
    }),
    // Content
    e(
      'div',
      {
        style: {
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          padding: '0 100px',
          maxWidth: 1000,
        },
      },
      // Avatar with gradient ring
      e(
        'div',
        {
          style: {
            width: 120,
            height: 120,
            borderRadius: '50%',
            padding: 4,
            background: 'linear-gradient(135deg, #00d4ff, #aa55ff, #ff3399)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        },
        e('img', {
          src: avatarSrc,
          width: 112,
          height: 112,
          style: { borderRadius: '50%', objectFit: 'cover' },
        }),
      ),
      // Name
      e('div', {
        style: {
          fontSize: 64,
          fontWeight: 800,
          fontFamily: 'Syne',
          color: '#f5f5f5',
          letterSpacing: '-0.03em',
          textShadow: '0 2px 24px rgba(0,0,0,0.5)',
          marginTop: 8,
        },
      }, 'Max Jackson'),
      // Tagline
      e('div', {
        style: {
          fontSize: 24,
          fontFamily: 'Space Mono',
          color: 'rgba(255,255,255,0.6)',
          letterSpacing: '0.02em',
          textShadow: '0 1px 10px rgba(0,0,0,0.4)',
        },
      }, tagline),
      // Bio
      bio ? e('div', {
        style: {
          fontSize: 21,
          fontFamily: 'Inter',
          color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.5,
          textAlign: 'center',
          textShadow: '0 1px 8px rgba(0,0,0,0.3)',
          marginTop: 4,
        },
      }, bio) : null,
      // Status badge
      status ? e(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginTop: 12,
            padding: '10px 24px',
            borderRadius: 24,
            backgroundColor: 'rgba(0, 212, 255, 0.08)',
            border: '1px solid rgba(0, 212, 255, 0.2)',
          },
        },
        e('div', {
          style: {
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: '#00ff88',
            boxShadow: '0 0 10px rgba(0, 255, 136, 0.5)',
          },
        }),
        e('span', {
          style: {
            fontSize: 18,
            fontFamily: 'Inter',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.75)',
            letterSpacing: '0.02em',
          },
        }, status),
      ) : null,
    ),
    // Footer
    e(
      'div',
      {
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          padding: '28px 56px',
          fontSize: 16,
          fontFamily: 'Space Mono',
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: '0.05em',
        },
      },
      'mxjxn.com',
    ),
  );

  const svg = await satori(element, {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      { name: 'Inter', data: interBold, weight: 700, style: 'normal' },
      { name: 'Syne', data: syneBold, weight: 700, style: 'normal' },
      { name: 'Space Mono', data: spaceMono, weight: 400, style: 'normal' },
    ],
  });

  const resvg = new Resvg(svg);
  const pngBuffer = resvg.render().asPng();

  return new Response(pngBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

export const prerender = false;
