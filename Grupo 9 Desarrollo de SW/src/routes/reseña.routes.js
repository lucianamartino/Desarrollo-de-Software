import { Router } from "express";
import { createReseña, getReseñas } from '../controllers/reseña.controller.js';
import { getOficiosFiltro } from "../controllers/oficio.controller.js"
import { getPerfil } from "../controllers/perfil.controller.js";

const router = Router();


// Ruta para manejar la creación
router.get('/valoracion/:id', async (req, res) => {
    const { oficios, oficioSeleccionado } = await getOficiosFiltro(req, res);
    const perfilId = req.params.id
    const usuarioIdLog = req.session.usuarioId

    res.render('reseñas/createReseña', {oficios, oficioSeleccionado, perfilId, usuarioIdLog})
})

router.post('/valoracion/:id', createReseña);

router.get('/', getReseñas); // Obtener todos 
// router.get('/:id', getReseña); // Obtener por ID

export default router;