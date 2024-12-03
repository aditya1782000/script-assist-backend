import User from "../../models/user";
import { AsyncResponseType } from "../../types/async";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;
const jwtSecret = process.env.JWT_SECRET || JWT_SECRET;

export const userLogin = async (
  email: string,
  password: string
): Promise<AsyncResponseType> => {
  try {
    let token: string = "";

    const oUser = await User.findOne({ email });

    if (!oUser) {
      return {
        statusCode: 404,
        success: false,
        message: "User not found",
      };
    }

    const passwordMatch: boolean = await bcrypt.compare(password, oUser.hash);

    if (!passwordMatch) {
      return {
        statusCode: 406,
        success: false,
        message: "Invalid password",
      };
    }

    token = jwt.sign({ id: oUser._id }, jwtSecret as string, {
      expiresIn: process.env.JWT_EXPIRES_IN as string,
    });

    return {
      statusCode: 200,
      success: true,
      message: "Login successful",
      data: {
        token,
        email: oUser.email || "",
        userName: oUser.userName || "",
        _id: oUser._id || "",
      },
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

export const userLogout = async (
  userId: string
): Promise<AsyncResponseType> => {
  try {
    await User.findByIdAndUpdate(userId, {
      token: "",
    });

    return {
      statusCode: 200,
      success: true,
      message: "User logged out successfully",
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
