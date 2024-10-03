import { Router } from "express";
import { createPost, getPosts, getPost, getPostsPorOficio} from '../controllers/post.controller.js';
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

router.get('/f/:nombreOficio', async (req, res) => {
    const posts = await getPostsPorOficio(req, res); // Obtener posts filtrados por oficio
    const oficios = await getOficios(req, res, true); // Obtener todos los oficios para el select
    const nombreOficio = req.params.nombreOficio;

    // Obtener el id del oficio que seleccionaste
    const oficioSeleccionado = oficios.find(oficio => oficio.nombre === nombreOficio);

    res.render('posts/filtrarPosts', { posts, oficios, nombreOficio, oficioSeleccionado }); // Renderizar la vista con los posts filtrados
});

export default router;