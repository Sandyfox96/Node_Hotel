const mongoose = require("mongoose");

const mongoUrl = "mongodb://localhost:27017/hotel";

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit the process if unable to connect
  });

const db = mongoose.connection;

db.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

module.exports = db;
