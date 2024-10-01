import { Router } from "express"
import { ping } from "../controllers/index.controller.js"
import { getUsuarios } from '../controllers/usuarios.controller.js';

const router = Router()

// Ruta para la página principal que muestra todos los usuarios
router.get('/', async (req, res) => {
    const usuarios = await getUsuarios(req, res, true); // Pasar true para obtener los usuarios
    res.render('index', { usuarios });
});

router.get('/ping', ping)

export default router