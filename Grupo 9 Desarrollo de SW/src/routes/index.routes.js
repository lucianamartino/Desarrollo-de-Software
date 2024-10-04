import { Router } from "express"
import { ping } from "../controllers/index.controller.js"
import { getUsuarios } from '../controllers/usuarios.controller.js';
import { getPosts } from '../controllers/post.controller.js';
import { getOficios } from '../controllers/oficio.controller.js';

const router = Router()

// Ruta para la página principal que muestra todos los posts y usuarios
router.get('/', async (req, res) => {
    const posts = await getPosts(req, res, true); // Pasar true para obtener los posts
    const usuarios = await getUsuarios(req, res, true); // Pasar true para obtener los usuarios
    const oficios = await getOficios(req, res, true); // Pasar true para obtener los oficios

    const nombreOficio = req.params.nombreOficio;

    // Obtener el id del oficio que seleccionaste
    const oficioSeleccionado = oficios.find(oficio => oficio.nombre === nombreOficio);

    res.render('index', { posts, usuarios, oficios, oficioSeleccionado }); // Asegúrate de pasar ambas variables
});

router.get('/ping', ping)

export default router