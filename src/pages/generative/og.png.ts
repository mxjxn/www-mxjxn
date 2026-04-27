import React from 'react';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import type { APIRoute } from 'astro';

const WIDTH = 1200;
const HEIGHT = 630;
const e = React.createElement;

const CYAN = '#00d4ff';
const MAGENTA = '#ff3399';
const ORANGE = '#ff8833';
const GREEN = '#00ff88';
const PURPLE = '#aa55ff';
const YELLOW = '#ffcc00';

const interBold = await fetch('https://bot.mxjxn.com/fonts/Inter-Bold.ttf').then(r => r.arrayBuffer());
const syneBold = await fetch('https://bot.mxjxn.com/fonts/Syne-Bold.ttf').then(r => r.arrayBuffer());

export const GET: APIRoute = async () => {
  const element = e(
    'div',
    {
      style: {
        width: WIDTH,
        height: HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#08080e',
        fontFamily: 'Inter',
        padding: 0,
      },
    },
    // Top: badge + title
    e(
      'div',
      { style: { display: 'flex', alignItems: 'center', gap: 16, padding: '48px 56px 0 56px' } },
      e(
        'div',
        {
          style: {
            display: 'flex',
            padding: '6px 14px',
            borderRadius: 6,
            backgroundColor: 'rgba(0, 212, 255, 0.1)',
            border: '1px solid rgba(0, 212, 255, 0.25)',
          },
        },
        e('span', {
          style: { color: CYAN, fontSize: 14, fontWeight: 700, fontFamily: 'Inter', letterSpacing: '0.1em' },
        }, 'LIVE'),
      ),
      e('div', {
        style: { fontSize: 42, fontWeight: 800, fontFamily: 'Syne', color: '#f5f5f5', letterSpacing: '-0.02em' },
      }, 'generative'),
    ),
    // Subtitle
    e('div', {
      style: { fontSize: 18, color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter', marginTop: 8, letterSpacing: '0.02em', padding: '0 56px' },
    }, 'algorithmic music · grows with time'),

    // Spacer
    e('div', { style: { flex: 1 } }),

    // Bottom: 4 synth modules
    e(
      'div',
      { style: { display: 'flex', gap: 16, padding: '0 56px 48px 56px' } },

      // MODULE: DRONE
      e(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 12,
            padding: '20px 24px',
            flex: 1,
          },
        },
        e('div', {
          style: { fontSize: 9, fontWeight: 700, fontFamily: 'Inter', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.2)', marginBottom: 16 },
        }, 'DRONE'),
        // Two knobs
        e(
          'div',
          { style: { display: 'flex', gap: 24, alignItems: 'center' } },
          // Knob 1
          e(
            'div',
            { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 } },
            e('div', {
              style: {
                width: 64, height: 64, borderRadius: '50%',
                border: '2px solid rgba(0, 212, 255, 0.3)',
                borderTopColor: CYAN,
                background: 'radial-gradient(circle at 40% 35%, #1a1a2e, #0e0e18)',
                boxShadow: '0 0 20px rgba(0, 212, 255, 0.15), inset 0 0 10px rgba(0,0,0,0.5)',
                transform: 'rotate(-45deg)',
              },
            }),
            e('div', { style: { fontSize: 9, fontFamily: 'Inter', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' } }, 'CUTOFF'),
            e('div', { style: { fontSize: 13, fontFamily: 'Inter', fontWeight: 700, color: CYAN } }, '51'),
          ),
          // Knob 2
          e(
            'div',
            { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 } },
            e('div', {
              style: {
                width: 64, height: 64, borderRadius: '50%',
                border: '2px solid rgba(0, 212, 255, 0.3)',
                borderTopColor: CYAN,
                borderRightColor: CYAN,
                background: 'radial-gradient(circle at 40% 35%, #1a1a2e, #0e0e18)',
                boxShadow: '0 0 20px rgba(0, 212, 255, 0.15), inset 0 0 10px rgba(0,0,0,0.5)',
                transform: 'rotate(20deg)',
              },
            }),
            e('div', { style: { fontSize: 9, fontFamily: 'Inter', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' } }, 'RESO'),
            e('div', { style: { fontSize: 13, fontFamily: 'Inter', fontWeight: 700, color: CYAN } }, '0.57'),
          ),
        ),
        // Sub knob
        e(
          'div',
          { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginTop: 16 } },
          e('div', {
            style: {
              width: 48, height: 48, borderRadius: '50%',
              border: '2px solid rgba(255, 51, 153, 0.25)',
              borderTopColor: MAGENTA,
              background: 'radial-gradient(circle at 40% 35%, #1a1a2e, #0e0e18)',
              boxShadow: '0 0 15px rgba(255, 51, 153, 0.1), inset 0 0 10px rgba(0,0,0,0.5)',
              transform: 'rotate(-30deg)',
            },
          }),
          e('div', { style: { fontSize: 9, fontFamily: 'Inter', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' } }, 'SUB'),
          e('div', { style: { fontSize: 12, fontFamily: 'Inter', fontWeight: 700, color: MAGENTA } }, '32'),
        ),
      ),

      // MODULE: FORM
      e(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 12,
            padding: '20px 24px',
            flex: 1,
          },
        },
        e('div', {
          style: { fontSize: 9, fontWeight: 700, fontFamily: 'Inter', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.2)', marginBottom: 16 },
        }, 'FORM'),
        // Two gauges
        e(
          'div',
          { style: { display: 'flex', gap: 20, alignItems: 'center' } },
          // Density
          e(
            'div',
            { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 } },
            e('div', {
              style: {
                width: 80, height: 80, borderRadius: '50%',
                border: '4px solid rgba(255,255,255,0.06)',
                borderTopColor: ORANGE,
                borderRightColor: ORANGE,
                boxShadow: '0 0 20px rgba(255, 136, 51, 0.15)',
                transform: 'rotate(-45deg)',
              },
            }),
            e('div', { style: { fontSize: 14, fontFamily: 'Inter', fontWeight: 700, color: ORANGE } }, '0.55'),
            e('div', { style: { fontSize: 9, fontFamily: 'Inter', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' } }, 'DENSITY'),
          ),
          // Energy
          e(
            'div',
            { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 } },
            e('div', {
              style: {
                width: 80, height: 80, borderRadius: '50%',
                border: '4px solid rgba(255,255,255,0.06)',
                borderTopColor: YELLOW,
                boxShadow: '0 0 20px rgba(255, 204, 0, 0.1)',
                transform: 'rotate(-60deg)',
              },
            }),
            e('div', { style: { fontSize: 14, fontFamily: 'Inter', fontWeight: 700, color: YELLOW } }, '0.35'),
            e('div', { style: { fontSize: 9, fontFamily: 'Inter', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' } }, 'ENERGY'),
          ),
        ),
        // Form word
        e('div', {
          style: { fontSize: 11, fontFamily: 'Inter', color: 'rgba(255,255,255,0.3)', marginTop: 12, letterSpacing: '0.1em' },
        }, 'emerging'),
      ),

      // MODULE: RHYTHM
      e(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 12,
            padding: '20px 24px',
            flex: 1,
          },
        },
        e('div', {
          style: { fontSize: 9, fontWeight: 700, fontFamily: 'Inter', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.2)', marginBottom: 16 },
        }, 'RHYTHM'),
        // Step dots
        e(
          'div',
          { style: { display: 'flex', flexDirection: 'column', gap: 14 } },
          // Melodic
          e(
            'div',
            { style: { display: 'flex', alignItems: 'center', gap: 8 } },
            e('div', { style: { fontSize: 8, fontFamily: 'Inter', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.05em', width: 24 } }, 'mel'),
            ...[1,0,0,1,0,1,0,0].map((hit, i) =>
              e('div', {
                key: `mel-${i}`,
                style: {
                  width: 10, height: 10, borderRadius: '50%',
                  backgroundColor: hit ? GREEN : 'rgba(255,255,255,0.06)',
                  boxShadow: hit ? `0 0 6px ${GREEN}` : 'none',
                },
              })
            ),
          ),
          // Textural
          e(
            'div',
            { style: { display: 'flex', alignItems: 'center', gap: 8 } },
            e('div', { style: { fontSize: 8, fontFamily: 'Inter', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.05em', width: 24 } }, 'tex'),
            ...[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1].map((hit, i) =>
              e('div', {
                key: `tex-${i}`,
                style: {
                  width: 8, height: 8, borderRadius: '50%',
                  backgroundColor: hit ? PURPLE : 'rgba(255,255,255,0.06)',
                  boxShadow: hit ? `0 0 6px ${PURPLE}` : 'none',
                },
              })
            ),
          ),
        ),
        // Pattern info
        e('div', {
          style: { fontSize: 11, fontFamily: 'Inter', color: 'rgba(255,255,255,0.2)', marginTop: 14, letterSpacing: '0.05em' },
        }, '3/8  ·  1/15'),
      ),

      // MODULE: PHASE
      e(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 12,
            padding: '20px 24px',
            flex: 0.8,
          },
        },
        e('div', {
          style: { fontSize: 9, fontWeight: 700, fontFamily: 'Inter', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.2)', marginBottom: 16 },
        }, 'PHASE'),
        // Two phase indicators
        e(
          'div',
          { style: { display: 'flex', gap: 16, alignItems: 'center' } },
          // Melodic phase
          e(
            'div',
            { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 } },
            e('div', {
              style: {
                width: 60, height: 60, borderRadius: '50%',
                border: '3px solid rgba(255,255,255,0.06)',
                borderTopColor: GREEN,
                borderRightColor: GREEN,
                borderBottomColor: 'rgba(0, 255, 136, 0.3)',
                boxShadow: '0 0 15px rgba(0, 255, 136, 0.1)',
                transform: 'rotate(-90deg)',
              },
            }),
            e('div', { style: { fontSize: 10, fontFamily: 'Inter', fontWeight: 700, color: GREEN } }, '0.4'),
            e('div', { style: { fontSize: 9, fontFamily: 'Inter', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' } }, 'MEL'),
          ),
          // Textural phase
          e(
            'div',
            { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 } },
            e('div', {
              style: {
                width: 60, height: 60, borderRadius: '50%',
                border: '3px solid rgba(255,255,255,0.06)',
                borderTopColor: PURPLE,
                borderRightColor: PURPLE,
                borderBottomColor: PURPLE,
                borderLeftColor: 'rgba(170, 85, 255, 0.3)',
                boxShadow: '0 0 15px rgba(170, 85, 255, 0.1)',
                transform: 'rotate(-90deg)',
              },
            }),
            e('div', { style: { fontSize: 10, fontFamily: 'Inter', fontWeight: 700, color: PURPLE } }, '0.8'),
            e('div', { style: { fontSize: 9, fontFamily: 'Inter', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' } }, 'TEX'),
          ),
        ),
      ),
    ),

    // Footer
    e(
      'div',
      {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 56px 32px 56px',
        },
      },
      e('div', { style: { fontSize: 14, fontFamily: 'Inter', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.02em' } }, 'mxjxn.com'),
      e('div', { style: { fontSize: 12, fontFamily: 'Inter', color: 'rgba(255,255,255,0.12)' } }, 'SuperSonic · WebAssembly'),
    ),
  );

  const svg = await satori(element, {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      { name: 'Inter', data: interBold, weight: 700, style: 'normal' },
      { name: 'Syne', data: syneBold, weight: 700, style: 'normal' },
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
