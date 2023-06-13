module.exports = {
  apps: [
    {
      name: 'beatjerky-backend',
      script: './bin/www.mjs',
      exec_mode: 'fork',
      max_memory_restart: '1024M',
      watch: false,
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      env: {
        NODE_ENV: 'local',
        PORT: process.env.PORT
      }
    }
  ]
}
