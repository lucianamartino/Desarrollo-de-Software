import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/uploads'); // Ruta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + path.extname(file.originalname); // Nombre único para cada archivo
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

// Filtro para limitar el tipo de archivos (opcional, solo imágenes)
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Solo se permiten archivos de imagen (.jpeg, .jpg, .png)'));
    }
};

// Inicializa multer con la configuración de almacenamiento y el filtro
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limita el tamaño del archivo a 5 MB
    fileFilter: fileFilter
});

export default upload;
