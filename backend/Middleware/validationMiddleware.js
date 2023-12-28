const { body, validationResult } = require("express-validator");

exports.validateSurvey = [
  body("name", "First name is required").notEmpty(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
