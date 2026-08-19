import { body, validationResult } from "express-validator";

const checkValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
      errors: errors.array(),
    });
  }

  next();
};

export const validateCreateContact = [
  body("name").trim().notEmpty().withMessage("Name is required"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone is required")
    .isMobilePhone("any")
    .withMessage("Please provide a valid phone number"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("service").trim().notEmpty().withMessage("Service is required"),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ max: 1000 })
    .withMessage("Message cannot exceed 1000 characters"),

  checkValidation,
];

export const validateUpdateContact = [
  body("status")
    .trim()
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["new", "contacted", "resolved"])
    .withMessage("Status must be one of: new, contacted, resolved"),

  checkValidation,
];
