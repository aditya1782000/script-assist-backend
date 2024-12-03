import express from "express";
import { validateOnlyUser } from "../../middlware/isOnlyUser";
import {
  addFilmsController,
  listProdutsController,
  viewCharacterController,
  viewFilmController,
} from "./films.controllers";

const router = express.Router();

router.post("/user/films/add", validateOnlyUser(), addFilmsController);

router.post("/user/films/list", validateOnlyUser(), listProdutsController);

router.get("/user/film/:id/view", validateOnlyUser(), viewFilmController);

router.get(
  "/user/film/:id/view/character",
  validateOnlyUser(),
  viewCharacterController
);

export default router;
