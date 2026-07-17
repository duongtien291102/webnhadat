module.exports = {
  apps: [
    {
      name: "webnhadat",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
}
