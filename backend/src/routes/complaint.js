const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");
const authMiddleware = require("../middleware/authMiddleware");

/* 🔥 DEPARTMENT → OFFICER EMAIL */
const departmentEmails = {
  "Road": "road@gmail.com",
  "Water": "water@gmail.com",
  "Electricity": "electricity@gmail.com",
  "Sanitation": "sanitation@gmail.com",
  "Railway": "railway@gmail.com"
};


/* =======================
   CREATE COMPLAINT
======================= */

router.post("/", authMiddleware, async (req, res) => {

  try {

    const { title, description, complaintType, region } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required"
      });
    }

    const complaintCode = "CIVIX-" + Date.now();

    /* 🔥 AUTO ASSIGN OFFICER */
    const assignedTo = departmentEmails[complaintType];

    const complaint = new Complaint({
      complaintCode,
      user: req.userId,
      title,
      description,
      complaintType,
      region,
      assignedTo   // ✅ NEW FIELD
    });

    await complaint.save();

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaintCode,
      complaint
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});


/* =======================
   GET USER COMPLAINTS
======================= */

router.get("/", authMiddleware, async (req, res) => {

  try {

    const complaints = await Complaint.find({
      user: req.userId
    });

    res.json(complaints);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});


/* =======================
   TRACK COMPLAINT
======================= */

router.get("/track/:code", async (req, res) => {

  try {

    const complaint = await Complaint.findOne({
      complaintCode: req.params.code
    });

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    res.json(complaint);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

module.exports = router;