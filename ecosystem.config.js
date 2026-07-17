module.exports = {
  apps: [{
    name: 'darianchirca',
    cwd: '/var/www/darianchirca',
    script: 'node_modules/.bin/next',
    args: 'start',
    env: {
      PORT: 3000,
      NODE_ENV: 'production',
      SMTP_USER: 'dmc.41155@gmail.com',
      SMTP_PASS: 'iqxl pgoa pwrp cver',
    },
    instances: 1,
    exec_mode: 'fork',
    watch: false,
    max_memory_restart: '300M',
  }]
};
