import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { HTTP_STATUS_CODES } from "configs/constants";
import { ApiError } from "./api-error";

const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME as string;
const CLOUDINARY_NAME_API_KEY = process.env.CLOUDINARY_NAME_API_KEY as string;
const CLOUDINARY_NAME_API_SECRET = process.env
  .CLOUDINARY_NAME_API_SECRET as string;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_NAME_API_KEY,
  api_secret: CLOUDINARY_NAME_API_SECRET,
});

export async function uploadToCloud(filePath: string) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(filePath);
    return result;
  } catch (error) {
    fs.unlinkSync(filePath);
    throw new ApiError(
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      "File upload failed",
      "INTERNAL_SERVER_ERROR"
    );
  }
}
