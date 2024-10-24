import { Router } from "express";
import { createPost, getPosts, getPost, getPostsPorOficio} from '../controllers/post.controller.js';
import { getOficiosFiltro } from '../controllers/oficio.controller.js';
import upload from '../middlewares/multer.js';

const router = Router();

// Ruta para mostrar el formulario de creación de posts
router.get('/create', async (req, res) => {
    const { oficios, oficioSeleccionado } = await getOficiosFiltro(req, res);

    if(req.session.loggedin) {
        res.render('posts/createPost', { oficios, oficioSeleccionado }); 
    } else {
        res.redirect('/')
    }
});

// Ruta para crear un post con la subida de imagen
router.post('/create', upload.single('foto'), createPost);

// Obtener todos los perfiles
router.get('/', getPosts);

// Ruta para ver el detalle de un post
router.get('/:id', async (req, res) => {
    const postId = parseInt(req.params.id); // Convertir a número entero

    // Obtener el post por ID utilizando la función corregida
    const post = await getPost(postId); 

    if (!post) {
        return res.status(404).send('Post no encontrado');
    }

    // Renderizar la vista 'postDetail' con el post encontrado
    res.render('posts/postDetalle', { post }); 
});

export default router;