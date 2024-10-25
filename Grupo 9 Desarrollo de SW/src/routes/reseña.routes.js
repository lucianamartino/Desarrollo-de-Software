import { Router } from "express";
import { createReseña, getReseñas, getReseña } from '../controllers/reseña.controller.js';
import { getOficiosFiltro } from "../controllers/oficio.controller.js"

const router = Router();


// Ruta para manejar la creación
router.get('/valoracion', async (req, res) => {
    const { oficios, oficioSeleccionado } = await getOficiosFiltro(req, res);

    res.render('reseñas/createReseña', {oficios, oficioSeleccionado})
})

router.post('/create', createReseña);

router.get('/', getReseñas); // Obtener todos 
// router.get('/:id', getReseña); // Obtener por ID

export default router;