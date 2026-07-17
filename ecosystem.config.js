module.exports = {
  apps: [
    {
      name: "webnhadat",
      cwd: __dirname,
      script: ".next/standalone/server.js",
      interpreter: "node",
      kill_timeout: 5000,
      listen_timeout: 10000,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        HOSTNAME: "0.0.0.0",
        PORT: 3000
      }
    }
  ]
}
