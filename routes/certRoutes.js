const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const role = require("../middleware/role");
const Certification = require("../models/Certification");


router.post("/", auth, role("APPLICANT"), async (req, res) => {
  const cert = new Certification({
    ...req.body,
    user: req.user.id,
    status: "PENDING"
  });

  await cert.save();
  res.json({ message: "Certification submitted" });
});

// Verifier views all certifications
router.get("/", auth, role("VERIFIER"), async (req, res) => {
  const certs = await Certification.find();
  res.json(certs);
});

router.get("/my", auth, role("APPLICANT"), async (req, res) => {
  const certs = await Certification.find({ user: req.user.id });
  res.json(certs);
});


router.put("/:id", auth, role("VERIFIER"), async (req, res) => {
  await Certification.findByIdAndUpdate(req.params.id, {
    status: req.body.status
  });

  res.json({ message: "Status updated" });
});

module.exports = router;
