import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICharacter extends Document {
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

export interface IFilms extends Document {
  title: string;
  description: string;
  director: string;
  producer: string;
  releaseDate: Date;
  characters: ICharacter[];
  user: mongoose.Types.ObjectId;
}

const CharacterSchema: Schema<ICharacter> = new Schema<ICharacter>({
  name: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  mass: {
    type: Number,
    required: true,
  },
  hairColor: {
    type: String,
    required: true,
  },
  skinColor: {
    type: String,
    required: true,
  },
  eyeColor: {
    type: String,
    required: true,
  },
  birthYear: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  films: [String],
});

const FilmsSchema: Schema<IFilms> = new Schema<IFilms>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    producer: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    characters: [CharacterSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: { createdAt: "dCreatedAt", updatedAt: "dUpdatedAt" } }
);

const Films: Model<IFilms> = mongoose.model<IFilms>("films", FilmsSchema);

export default Films;
