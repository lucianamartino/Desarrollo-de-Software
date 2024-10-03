import { Router } from "express";
import { createPerfil, getPerfiles, getPerfil, showCreatePerfilForm } from '../controllers/perfil.controller.js';
import { getLocalidades } from '../controllers/localidad.controller.js';

const router = Router();


// Ruta para mostrar el formulario de creación de perfil
router.get('/create', showCreatePerfilForm);

// Ruta para manejar la creación de perfil (POST)
router.post('/create', createPerfil);

router.get('/', getPerfiles); // Obtener todos los perfiles
router.get('/:id', async (req, res) => {
    const perfil = await getPerfil(req, res, true)
    res.render('perfiles/verPerfil', { perfil })
})

export default router;
