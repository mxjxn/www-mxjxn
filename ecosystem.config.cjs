module.exports = {
  apps: [{
    name: 'www-mxjxn',
    script: '/opt/www-mxjxn/dist/server/entry.mjs',
    env: {
      PORT: 4322,
      HOST: '0.0.0.0',
      KEYSTATIC_SECRET: process.env.KEYSTATIC_SECRET,
      KEYSTATIC_GITHUB_CLIENT_ID: process.env.KEYSTATIC_GITHUB_CLIENT_ID,
      KEYSTATIC_GITHUB_CLIENT_SECRET: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
      PUBLIC_KEYSTATIC_GITHUB_APP_SLUG: 'mxjxn-com-keystatic',
    }
  }]
}
