import User from "../../models/user";
import { AsyncResponseType } from "../../types/async";
import bcrypt from "bcrypt";

export const registerUser = async (
  userName: string,
  email: string,
  password: string,
  confirmPassword: string
): Promise<AsyncResponseType> => {
  try {
    const exisitngUser = await User.findOne({ email });

    if (exisitngUser) {
      return {
        statusCode: 409,
        success: false,
        message: "User with this email already exists",
      };
    }

    if (password !== confirmPassword) {
      return {
        statusCode: 400,
        success: false,
        message: "Passwords do not match",
      };
    }

    const hash = await bcrypt.hash(password, 10);

    await User.create({
      userName,
      email,
      hash,
    });

    return {
      statusCode: 200,
      success: true,
      message: "You have registered successfully",
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
