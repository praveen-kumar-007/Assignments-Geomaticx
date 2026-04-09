export default function validateContact(req, res, next) {
  const { Name, Phone, Email, Message } = req.body;
  const errors = [];

  if (!Name?.trim()) errors.push("Name is required");
  if (!Phone?.trim() || !/^\d{10}$/.test(Phone))
    errors.push("Phone must be 10 digits");
  if (!Email?.trim() || !Email.includes("@"))
    errors.push("Valid email is required");
  if (!Message?.trim()) errors.push("Message is required");

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
}
