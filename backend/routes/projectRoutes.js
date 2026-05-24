const express = require("express");

const Project = require("../models/Project");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {

  try {

    if (req.user.role !== "Admin") {
      return res.status(403).json({
        message: "Only Admin can create projects"
      });
    }

    const project = await Project.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json(project);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

router.get("/", authMiddleware, async (req, res) => {

  try {

    const projects = await Project.find()
    .populate("members", "name email");

    res.json(projects);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;