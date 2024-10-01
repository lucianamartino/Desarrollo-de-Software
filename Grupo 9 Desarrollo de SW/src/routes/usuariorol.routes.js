import { Router } from "express";
import { createUsuarioRol, getUsuariosRol, getUsuarioRol } from '../controllers/usuariorol.controller.js';

const router = Router();


// Ruta para manejar la creación
router.post('/create', createUsuarioRol);

router.get('/', getUsuariosRol); // Obtener todos 
router.get('/:id', getUsuarioRol); // Obtener por ID

export default router;