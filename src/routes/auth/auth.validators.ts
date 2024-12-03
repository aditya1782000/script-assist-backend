import { body } from "express-validator";

export const userLoginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Please enter your email")
    .bail()
    .isEmail()
    .withMessage("Please enter valid email"),

  body("password").notEmpty().withMessage("Please enter your password"),
];
