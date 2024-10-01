import { Router } from "express";
import { createLocalidad, getLocalidades, getLocalidad } from '../controllers/localidad.controller.js';

const router = Router();


// Ruta para manejar la creación
router.post('/create', createLocalidad);

router.get('/', getLocalidades); // Obtener todos 
router.get('/:id', getLocalidad); // Obtener por ID

export default router;