import { Router } from "express"
import { getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario } from "../controllers/usuarios.controller.js"
import { getOficios } from "../controllers/oficio.controller.js"

const router = Router()

// Ruta para mostrar el formulario de creación de usuario
router.get('/usuarios/create', async (req, res) => {
    const oficios = await getOficios(req, res, true); // Obtener todos los oficios para el select
    const nombreOficio = req.params.nombreOficio;

    // Obtener el id del oficio que seleccionaste
    const oficioSeleccionado = oficios.find(oficio => oficio.nombre === nombreOficio);

    res.render('usuarios/createUsuario', {oficios, oficioSeleccionado}); 
});

// Ruta para manejar la creación de un nuevo usuario
router.post('/usuarios/create', async (req, res) => {
    await createUsuario(req, res);

    // res.render('usuarios/createUsuario', {
    //     alert: true,
    //     alertTitle: "Registration",
    //     alertMessage: "Successful Registration",
    //     alertIcon: 'success',
    //     showConfirmButton: false,
    //     timer: 1500,
    //     ruta: ''
    // })
});


router.get('/usuarios', getUsuarios)
router.get('/usuarios/:id', getUsuario)

router.patch('/usuarios/:id', updateUsuario)

router.delete('/usuarios/:id', deleteUsuario)

export default router