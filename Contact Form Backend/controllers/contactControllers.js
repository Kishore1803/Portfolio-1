const { sql } = require("../config/db");

exports.submitContactForm = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      res.status(400);
      throw new Error("Required fields missing");
    }

    await sql.query`
      INSERT INTO Contacts (name, email, subject, message)
      VALUES (${name}, ${email}, ${subject}, ${message})
    `;

    res.status(201).json({
      success: true,
      message: "Message sent successfully"
    });

  } catch (error) {
    next(error);
  }
};