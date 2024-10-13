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
    const oficioSeleccionado = oficios.find(oficio => oficio.nombre === nombreOficio);

    const login = req.session.loggedin;

    res.render('index', {
        posts,
        usuarios,
        oficios,
        oficioSeleccionado,
        login,
        name: login ? req.session.name : 'Debe iniciar sesión', // Mensaje para mostrar el nombre o indicar que debe iniciar sesión
        usuarioId: login ? req.session.usuarioId : 'Debe iniciar sesión' // Mensaje para mostrar el id o indicar que debe iniciar sesión
    });
});

router.get('/ping', ping)

export default router