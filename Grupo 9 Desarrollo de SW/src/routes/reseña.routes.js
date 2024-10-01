import { Router } from "express";
import { createReseña, getReseñas, getReseña } from '../controllers/reseña.controller.js';

const router = Router();


// Ruta para manejar la creación
router.post('/create', createReseña);

router.get('/', getReseñas); // Obtener todos 
router.get('/:id', getReseña); // Obtener por ID

export default router;