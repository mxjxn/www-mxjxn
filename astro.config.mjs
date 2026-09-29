import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

export default defineConfig({
  site: 'https://www.mxjxn.com',
  output: 'server',
  security: {
    allowedDomains: [{ protocol: 'https', hostname: 'www.mxjxn.com' }],
  },
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [react(), markdoc(), keystatic()],
  server: {
    allowedHosts: ['www.mxjxn.com', 'mxjxn.com', 'preview.mxjxn.com'],
  },
});
