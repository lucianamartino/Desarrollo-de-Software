import { Router } from "express";
import { createOficio, getOficios, getOficio } from '../controllers/oficio.controller.js';

const router = Router();


// Ruta para manejar la creación
router.post('/create', createOficio);

router.get('/', getOficios); // Obtener todos 
router.get('/:id', getOficio); // Obtener por ID

export default router;