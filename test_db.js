const mongoose = require('mongoose');

const uri = "mongodb+srv://webnhadat_db_user:xliArl9QbnitUlx7@webnhadat.iuvabmq.mongodb.net/Thongtin?retryWrites=true&w=majority&appName=webnhadat";

mongoose.connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });
