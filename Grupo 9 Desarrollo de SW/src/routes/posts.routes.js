import { Router } from "express";
import { createPost, getPosts, getPost, getPostsPorOficio, deletePost} from '../controllers/post.controller.js';
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
router.post('/create', upload.array('foto', 10), createPost);



// Obtener todos los perfiles
router.get('/', getPosts);

// filtrar por posts
router.get('/f/:nombreOficio', async (req, res) => {
    const posts = await getPostsPorOficio(req, res); // Obtener posts filtrados por oficio
    const { oficios, oficioSeleccionado, nombreOficio } = await getOficiosFiltro(req, res);
    
    res.render('posts/filtrarPosts', { posts, oficios, nombreOficio, oficioSeleccionado }); // Renderizar la vista con los posts filtrados
})

router.delete('/delete/:id', deletePost);

// Ruta para ver el detalle de un post
router.get('/:id', async (req, res) => {
    // Obtener el post por ID utilizando la función corregida
    const post = await getPost(req, res); 
    const { oficios, oficioSeleccionado } = await getOficiosFiltro(req, res);

    if (!post) {
        return res.status(404).send('Post no encontrado');
    }

    // Renderizar la vista 'postDetail' con el post encontrado
    res.render('posts/postDetalle', { post, oficios, oficioSeleccionado }); 
});

export default router;