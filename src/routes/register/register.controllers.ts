import { Request, Response } from "express";
import { registerUser } from "./register.services";
import { validationResult } from "express-validator";

export const registerUserControllers = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userName, email, password, confirmPassword } = req.body;

  const oResponse = await registerUser(
    userName,
    email,
    password,
    confirmPassword
  );

  return res.status(oResponse.statusCode).send({
    ...oResponse,
    statusCode: undefined,
  });
};
