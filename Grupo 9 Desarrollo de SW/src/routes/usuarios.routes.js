import { Router } from "express"
import { getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario } from "../controllers/usuarios.controller.js"
import { getOficiosFiltro } from "../controllers/oficio.controller.js"

const router = Router()

// Ruta para mostrar el formulario de creación de usuario
router.get('/usuarios/create', async (req, res) => {
    const { oficios, oficioSeleccionado } = await getOficiosFiltro(req, res);

    res.render('usuarios/createUsuario', {oficios, oficioSeleccionado, error: res.locals.error}); 
});

// Ruta para manejar la creación de un nuevo usuario
router.post('/usuarios/create', createUsuario);

router.get('/usuarios', getUsuarios)
router.get('/usuarios/:id', getUsuario)

router.patch('/usuarios/:id', updateUsuario)

router.delete('/usuarios/:id', deleteUsuario)

export default router