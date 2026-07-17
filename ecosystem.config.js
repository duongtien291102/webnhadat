const path = require("path");

const releasePath = process.env.APP_RELEASE_PATH || path.join(__dirname, ".next", "standalone");

module.exports = {
  apps: [
    {
      name: "webnhadat",
      cwd: releasePath,
      script: path.join(releasePath, "server.js"),
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
