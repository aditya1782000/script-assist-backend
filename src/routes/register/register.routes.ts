import express from "express";
import { registerUserControllers } from "./register.controllers";
import { registerUserValidators } from "./register.validators";

const router = express.Router();

router.post("/register/user", registerUserValidators, registerUserControllers);

export default router;
