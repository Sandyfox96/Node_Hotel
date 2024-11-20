const express = require("express");
const db = require("./db");
const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Route definitions
app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to my hotel");
});

// Handle uncaught errors
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.stack);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason.stack || reason);
  process.exit(1);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
