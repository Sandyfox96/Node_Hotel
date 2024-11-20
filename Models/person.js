const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true, min: 18, max: 120 },
  work: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
