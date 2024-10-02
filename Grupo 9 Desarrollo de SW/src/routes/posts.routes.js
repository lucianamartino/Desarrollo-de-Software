import { Router } from "express";
import { createPost, getPosts, getPost} from '../controllers/post.controller.js';
import { getOficios } from '../controllers/oficio.controller.js';
import upload from '../middlewares/multer.js';

const router = Router();

// Ruta para mostrar el formulario de creación de posts
router.get('/create', async (req, res) => {
    const oficios = await getOficios(req, res, true); // Obtener los oficios de la BD
    res.render('posts/createPost', { oficios }); 
});

// Ruta para crear un post con la subida de imagen
router.post('/create', upload.single('foto'), createPost);

// Obtener todos los perfiles
router.get('/', getPosts);

// Obtener perfil por ID
router.get('/:id', getPost);

export default router;