import { Router } from "express";
import { createRol, getRoles, getRol } from '../controllers/rol.controller.js';

const router = Router();


// Ruta para manejar la creación
router.post('/create', createRol);

router.get('/', getRoles); // Obtener todos 
router.get('/:id', getRol); // Obtener por ID

export default router;