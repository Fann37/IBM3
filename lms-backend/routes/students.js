const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

/* GET all students */
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch students" });
  }
});

/* POST new student */
router.post("/", async (req, res) => {
  try {
    const student = new Student({ name: req.body.name });
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* UPDATE student */
router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    res.json(updatedStudent);
  } catch (error) {
    res.status(404).json({ message: "Student not found" });
  }
});

/* DELETE student */
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Student not found" });
  }
});

module.exports = router;
