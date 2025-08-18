import multer from "multer";

// Use memory storage to access file.buffer
const storage = multer.memoryStorage();

export const singleUpload = multer({ storage }).single("file");