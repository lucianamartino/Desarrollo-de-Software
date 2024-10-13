import { Router } from "express";
import { createPost, getPosts, getPost, getPostsPorOficio} from '../controllers/post.controller.js';
import { getOficiosFiltro } from '../controllers/oficio.controller.js';
import upload from '../middlewares/multer.js';

const router = Router();

// Ruta para mostrar el formulario de creación de posts
router.get('/create', async (req, res) => {
    const { oficios, oficioSeleccionado } = await getOficiosFiltro(req, res);

    res.render('posts/createPost', { oficios, oficioSeleccionado }); 
});

// Ruta para crear un post con la subida de imagen
router.post('/create', upload.single('foto'), createPost);

// Obtener todos los perfiles
router.get('/', getPosts);

// Obtener perfil por ID
router.get('/:id', getPost);

router.get('/f/:nombreOficio', async (req, res) => {
    const posts = await getPostsPorOficio(req, res); // Obtener posts filtrados por oficio

    const { oficios, oficioSeleccionado, nombreOficio } = await getOficiosFiltro(req, res);

    res.render('posts/filtrarPosts', { posts, oficios, nombreOficio, oficioSeleccionado }); // Renderizar la vista con los posts filtrados
});

export default router;