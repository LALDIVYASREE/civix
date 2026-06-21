const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");

/* ===========================
   GET COMPLAINTS FOR OFFICER
=========================== */

router.get("/:email", async (req, res) => {

  try {

    const officerEmail = req.params.email;

    const complaints = await Complaint.find({
      assignedTo: officerEmail   // 🔥 IMPORTANT CHANGE
    });

    res.json(complaints);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});


/* ===========================
   UPDATE STATUS
=========================== */

router.put("/status/:id", async (req, res) => {

  try {

    const { status } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(complaint);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});


/* ===========================
   FORWARD COMPLAINT
=========================== */

router.put("/forward/:id", async (req, res) => {

  try {

    const { email } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { assignedTo: email },   // 🔥 CHANGE OWNER
      { new: true }
    );

    res.json(complaint);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

module.exports = router;