import express from "express";
import { userLoginController, userLogoutController } from "./auth.controllers";
import { userLoginValidator } from "./auth.validators";
import { validateOnlyUser } from "../../middlware/isOnlyUser";

const router = express.Router();

router.post("/user/login", userLoginValidator, userLoginController);

router.post("/user/logout", validateOnlyUser(), userLogoutController);

export default router;
