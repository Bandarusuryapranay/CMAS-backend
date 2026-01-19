const Certification = require("../models/Certification");

exports.submitCert = async (req, res) => {
  await Certification.create({
    ...req.body,
    applicantId: req.user.id
  });
  res.json({ message: "Submitted" });
};

exports.verifyCert = async (req, res) => {
  const cert = await Certification.findById(req.params.id);

  if (cert.status !== "PENDING")
    return res.status(400).json({ message: "Already processed" });

  cert.status = req.body.status;
  cert.verifiedBy = req.user.id;
  cert.verifiedAt = new Date();
  await cert.save();

  res.json({ message: "Updated" });
};
