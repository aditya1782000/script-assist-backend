import { body } from "express-validator";

export const registerUserValidators = [
  body("userName")
    .notEmpty()
    .withMessage("User Name is required")
    .bail()
    .isString()
    .withMessage("First name must be a string"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Email is invalid"),
  body("password")
    .notEmpty()
    .withMessage("Please enter your password")
    .bail()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/)
    .withMessage(
      "Password must be 8-15 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Please enter confirm password"),
];
