import { Router } from "express";
import { createPerfil, getPerfiles, getPerfil, showCreatePerfilForm } from '../controllers/perfil.controller.js';

const router = Router();


// Ruta para mostrar el formulario de creación de perfil
router.get('/create', showCreatePerfilForm);

// Ruta para manejar la creación de perfil (POST)
router.post('/create', createPerfil);

router.get('/', getPerfiles); // Obtener todos los perfiles
router.get('/:id', getPerfil); // Obtener perfil por ID

export default router;
