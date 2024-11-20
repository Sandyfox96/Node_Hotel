const express = require("express");
const router = express.Router();
const Person = require("../models/Person");
const validator = require("validator");

// POST: Add a person
router.post("/", async (req, res) => {
  try {
    const { name, age, work, email } = req.body;

    if (!name || !age || !work || !email) {
      return res.status(400).json({ error: "All fields are required: name, age, work, email" });
    }

    // Email format validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Age validation: 18 <= age <= 120
    if (age < 18 || age > 120) {
      return res.status(400).json({ error: "Age must be between 18 and 120" });
    }

    const newPerson = new Person({ name, age, work, email });
    const savedPerson = await newPerson.save();
    res.status(201).json(savedPerson);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Email must be unique" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET: Fetch all persons
router.get("/", async (req, res) => {
  try {
    const persons = await Person.find();
    res.status(200).json(persons);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET: Fetch persons by work type
router.get("/:worktype", async (req, res) => {
  try {
    const { worktype } = req.params;
    const validWorkTypes = ["Chef", "Waiter", "Manager"];

    if (!validWorkTypes.includes(worktype)) {
      return res.status(400).json({ error: "Invalid work type. Valid types: Chef, Waiter, Manager." });
    }

    const persons = await Person.find({ work: worktype });
    res.status(200).json(persons);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
