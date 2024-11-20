const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// POST: Add a menu item
router.post("/", async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    const savedMenuItem = await menuItem.save();
    res.status(201).json(savedMenuItem);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET: Fetch menu items with optional filters
router.get("/", async (req, res) => {
  try {
    const filters = req.query;
    const menuItems = await MenuItem.find(filters);
    res.status(200).json(menuItems);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET: Fetch menu items by taste (Sweet, Spicy, Sour)
router.get("/:foodtype", async (req, res) => {
  try {
    const { foodtype } = req.params;
    const validTasteTypes = ["Sweet", "Spicy", "Sour"];

    if (!validTasteTypes.includes(foodtype)) {
      return res.status(400).json({ error: "Invalid food type. Valid types: Sweet, Spicy, Sour." });
    }

    const menuItems = await MenuItem.find({ taste: foodtype });
    res.status(200).json(menuItems);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
