import { Router } from "express";
import { createUbicacion, getUbicaciones, getUbicacion } from '../controllers/ubicacion.controller.js';

const router = Router();


// Ruta para manejar la creación
router.post('/create', createUbicacion);

router.get('/', getUbicaciones); // Obtener todos 
router.get('/:id', getUbicacion); // Obtener por ID

export default router;