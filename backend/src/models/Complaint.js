const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({

  complaintCode: {
    type: String
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  title: String,
  description: String,
  complaintType: String,
  region: String,

  status: {
    type: String,
    default: "Pending"
  },

  // 🔥 THIS IS THE MISSING PART
  assignedTo: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Complaint", complaintSchema);