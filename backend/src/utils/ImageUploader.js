import multer from "multer";

const storage = multer.diskStorage({});

const ImageUploader = multer({ storage: storage });

export default ImageUploader;
