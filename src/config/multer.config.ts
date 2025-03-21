import { diskStorage } from "multer";
import { extname } from "path";

export const storageConfig = {
    storage: diskStorage({
        destination: './uploads', // Folder penyimpanan
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
        },
    }),
};
