module.exports = {
  apps: [
    {
      name: "webnhadat-prod",
      script: "npm",
      args: "start",
      env: {
        PORT: 3000,
        NODE_ENV: "production",
      },
    },
    {
      name: "webnhadat-test",
      script: "npm",
      args: "start",
      env: {
        PORT: 3001,
        NODE_ENV: "production", // Vẫn để là production để Next.js chạy tối ưu
      },
    },
  ],
};
