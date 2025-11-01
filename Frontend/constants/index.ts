import { Platform } from "react-native";

export const API_URL =
  Platform.OS === "ios" ? "http://localhost:3000" : "http://10.0.2.2:3000";

export const CLOUDINARY_CLOUD_NAME = "dfkqrijtg";
export const CLOUDINARY_UPLOAD_PRESET = "images";
// export const CLOUDINARY_API_SECRET = "your_api_secret";
