import express from "express";
import auth from "./auth/auth.routes";
import register from "./register/register.routes";
import films from "./films/films.routes";

const router = express.Router();

router.use("/", [auth, register, films]);

export default router;
