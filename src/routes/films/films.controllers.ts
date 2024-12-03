import { Request, Response } from "express";
import { addFilm, listFilms, viewCharacter, viewFilm } from "./films.services";

export const addFilmsController = async (req: Request, res: Response) => {
  const userId = (req as any).userId;

  const { title, description, director, producer, releaseDate, characters } =
    req.body;

  const oResponse = await addFilm(
    title,
    description,
    director,
    producer,
    releaseDate,
    characters,
    userId
  );

  return res.status(oResponse.statusCode).send({
    ...oResponse,
    statusCode: undefined,
  });
};

export const listProdutsController = async (req: Request, res: Response) => {
  const userId = (req as any).userId;

  const offSet = Number(req.body.start);
  const limit = Number(req.body.length);

  const oResponse = await listFilms(req, offSet, limit, userId);

  return res.status(oResponse.statusCode).send({
    ...oResponse,
    statusCode: undefined,
  });
};

export const viewFilmController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const oResponse = await viewFilm(id);

  return res.status(oResponse.statusCode).send({
    ...oResponse,
    statusCode: undefined,
  });
};

export const viewCharacterController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const oResponse = await viewCharacter(id);

  return res.status(oResponse.statusCode).send({
    ...oResponse,
    statusCode: undefined,
  });
};
