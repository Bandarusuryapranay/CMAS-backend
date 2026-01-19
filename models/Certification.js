const mongoose = require("mongoose");

const certSchema = new mongoose.Schema({
  applicantId: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  status: { type: String, default: "PENDING" },
  verifiedBy: mongoose.Schema.Types.ObjectId,
  verifiedAt: Date
});

module.exports = mongoose.model("Certification", certSchema);
