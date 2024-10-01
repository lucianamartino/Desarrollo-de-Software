import { Router } from "express";
import { createProvincia, getProvincias, getProvincia } from '../controllers/provincia.controller.js';

const router = Router();


// Ruta para manejar la creación
router.post('/create', createProvincia);

router.get('/', getProvincias); // Obtener todos 
router.get('/:id', getProvincia); // Obtener por ID

export default router;