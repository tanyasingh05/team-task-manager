const express = require("express");

const Task = require("../models/Task");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {

  try {

    if (req.user.role !== "Admin") {
      return res.status(403).json({
        message: "Only Admin can create tasks"
      });
    }

    const task = await Task.create(req.body);

    res.status(201).json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

router.get("/", authMiddleware, async (req, res) => {

  try {

    const tasks = await Task.find()
    .populate("project", "name")
    .populate("assignedTo", "name email");

    res.json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

router.put("/:id", authMiddleware, async (req, res) => {

  try {

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTask);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;