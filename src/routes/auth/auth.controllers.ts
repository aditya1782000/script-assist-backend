import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { userLogin, userLogout } from "./auth.services";

export const userLoginController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const oResponse = await userLogin(email, password);

  return res
    .status(oResponse.statusCode)
    .send({ ...oResponse, statusCode: undefined });
};

export const userLogoutController = async (req: Request, res: Response) => {
  const userId = (req as any).userId;

  const oResponse = await userLogout(userId);

  return res
    .status(oResponse.statusCode)
    .send({ ...oResponse, statusCode: undefined });
};
