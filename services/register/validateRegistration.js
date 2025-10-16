export default function validateRegistration(req, res, next) {
  const { name, phoneNumber, email } = req.body;
  const missing = [];
  if (!name) missing.push("name");
  if (!phoneNumber) missing.push("phoneNumber");
  if (!email) missing.push("email");

  if (missing.length) {
    return res.status(400).json({ message: `Missing required fields: ${missing.join(", ")}` });
  }

  next();
}
