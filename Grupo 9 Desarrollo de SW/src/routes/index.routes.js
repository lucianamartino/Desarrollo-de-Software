import { Router } from "express"
import { ping } from "../controllers/index.controller.js"
import { getUsuarios } from '../controllers/usuarios.controller.js';
import { getPosts } from '../controllers/post.controller.js';

const router = Router()

// router.get('/', async (req, res) => {
//     const posts = await getPosts(req, res, true); // Pasar true para obtener los posts
//     res.render('index', { posts });
// });

// // Ruta para la página principal que muestra todos los usuarios
// router.get('/', async (req, res) => {
//     const usuarios = await getUsuarios(req, res, true); // Pasar true para obtener los usuarios
//     res.render('index', { usuarios });
// });

// Ruta para la página principal que muestra todos los posts y usuarios
router.get('/', async (req, res) => {
    const posts = await getPosts(req, res, true); // Pasar true para obtener los posts
    const usuarios = await getUsuarios(req, res, true); // Pasar true para obtener los usuarios
    res.render('index', { posts, usuarios }); // Asegúrate de pasar ambas variables
});

router.get('/ping', ping)

export default router