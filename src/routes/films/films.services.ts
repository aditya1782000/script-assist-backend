import Films from "../../models/films";
import { AsyncResponseType } from "../../types/async";
import { Request } from "express";
import dataTable from "../../utils/dataTable";
import mongoose from "mongoose";

interface Filter {
  year?: number;
}

export interface ICharacter {
  name: string;
  height: number;
  mass: number;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  birthYear: string;
  gender: string;
  films: string[];
}

export const addFilm = async (
  title: string,
  description: string,
  director: string,
  producer: string,
  releaseDate: Date,
  characters: ICharacter[],
  user: mongoose.Types.ObjectId
): Promise<AsyncResponseType> => {
  try {
    const oFilm = await Films.create({
      title,
      description,
      director,
      producer,
      releaseDate,
      characters,
      user,
    });

    return {
      statusCode: 201,
      success: true,
      message: "Film added successfully",
      data: oFilm,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        statusCode: 500,
        success: false,
        message: error.message || "Something went wrong",
      };
    }

    return {
      statusCode: 500,
      success: false,
      message: "Something went wrong",
    };
  }
};

function createFilterQuery(filter: Filter) {
  const query: any = {};

  if (filter?.year) {
    query.$expr = {
      $eq: [{ $year: "$releaseDate" }, filter.year],
    };
  }

  return query;
}

export const listFilms = async (
  req: Request,
  start: number,
  limit: number,
  user: mongoose.Types.ObjectId
): Promise<AsyncResponseType> => {
  try {
    const filterQuery = createFilterQuery(req.body.filter);
    const searchFields = ["title", "director", "producer"];

    const oData = dataTable.initDataTable(req.body, searchFields, "srNo");

    const nRecordsTotal = await Films.countDocuments({
      user: { $in: user },
    });

    const filmList = await Films.find({
      $and: [oData.oSearchData, filterQuery],
      user: { $in: user },
    })
      .select("title director producer releaseDate")
      .collation({ locale: "en", strength: 1 })
      .sort(oData.oSortingOrder)
      .skip(start)
      .limit(limit)
      .lean();

    return {
      statusCode: 200,
      success: true,
      message: "Films list fetched successfully",
      data: filmList,
      draw: req.body.draw,
      recordsTotal: nRecordsTotal,
      recordsFiltered: nRecordsTotal,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        statusCode: 500,
        success: false,
        message: error.message || "Something went wrong",
      };
    }

    return {
      statusCode: 500,
      success: false,
      message: "Something went wrong",
    };
  }
};

export const viewFilm = async (filmsId: string): Promise<AsyncResponseType> => {
  try {
    const oFilm = await Films.findById({ _id: filmsId })
      .select("title description director producer releaseDate characters")
      .lean();

    if (!oFilm) {
      return {
        statusCode: 404,
        success: false,
        message: "Film not found",
      };
    }

    return {
      statusCode: 200,
      success: true,
      message: "Film fetched successfully",
      data: oFilm,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        statusCode: 500,
        success: false,
        message: error.message || "Something went wrong",
      };
    }

    return {
      statusCode: 500,
      success: false,
      message: "Something went wrong",
    };
  }
};

export const viewCharacter = async (
  characterId: string
): Promise<AsyncResponseType> => {
  try {
    const oCharacter = await Films.findOne({
      "characters._id": characterId,
    })
      .select("characters.$")
      .lean();

    if (!oCharacter) {
      return {
        statusCode: 404,
        success: false,
        message: "Character not found",
      };
    }

    return {
      statusCode: 200,
      success: true,
      message: "Character fetched successfully",
      data: oCharacter,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        statusCode: 500,
        success: false,
        message: error.message || "Something went wrong",
      };
    }

    return {
      statusCode: 500,
      success: false,
      message: "Something went wrong",
    };
  }
};
