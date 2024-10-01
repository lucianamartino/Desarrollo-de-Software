import { Router } from "express";
import { createOficioPerfil, getOficiosPerfil, getOficioPerfil } from '../controllers/oficioperfil.controller.js';

const router = Router();


// Ruta para manejar la creación
router.post('/create', createOficioPerfil);

router.get('/', getOficiosPerfil); // Obtener todos 
router.get('/:id', getOficioPerfil); // Obtener por ID

export default router;