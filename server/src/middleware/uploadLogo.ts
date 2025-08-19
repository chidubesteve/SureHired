import multer from 'multer';
import path from 'path';
import fs from 'fs';


// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// configure Multer Storage
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, uploadDir);
    },
    filename: (_, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
});

export const uploadLogo = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024, // Limit file size to 2MB
    },
    fileFilter: (_, file, cb) => { 
        const allowed = ['.png', '.jpg', '.jpeg', '.webp'];
        if(!allowed.includes(file.mimetype.split('/')[1])) {
            return cb(new Error('Invalid file type. Only PNG, JPG, JPEG, and WEBP are allowed.'));
        }
        cb(null, true);
    }
})