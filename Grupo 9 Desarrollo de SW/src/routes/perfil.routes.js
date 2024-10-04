import { Router } from "express";
import { createPerfil, getPerfiles, getPerfil, getPerfilPorUsuarioId } from '../controllers/perfil.controller.js';
import { getLocalidades } from '../controllers/localidad.controller.js';
import { getOficios } from '../controllers/oficio.controller.js';

const router = Router();

router.get('/create', async (req, res) =>{
    const usuarioId = req.query.usuarioId; // Obtener el ID del usuario de la consulta de la URL
    const localidades = await getLocalidades(req, res, true)
    const oficios = await getOficios(req, res, true);

    const nombreOficio = req.params.nombreOficio;
    // Obtener el id del oficio que seleccionaste
    const oficioSeleccionado = oficios.find(oficio => oficio.nombre === nombreOficio);

    res.render('perfiles/createPerfil', { usuarioId, localidades, oficioSeleccionado, oficios }); // Pasar el ID del usuario a la vista
})

// Ruta para manejar la creación de perfil (POST)
router.post('/create', createPerfil);

router.get('/', getPerfiles); // Obtener todos los perfiles

router.get('/:id', async (req, res) => {
    const usuarioId = req.params.id; // Obtener el ID de usuario desde la URL
    // const perfil = await getPerfil(req, res, true)
    const perfil = await getPerfilPorUsuarioId(usuarioId, req, res);

    if (!perfil) {
        return res.status(404).send('Perfil no encontrado');
    }


    const oficios = await getOficios(req, res, true);
    const nombreOficio = req.params.nombreOficio;
    // Obtener el id del oficio que seleccionaste
    const oficioSeleccionado = oficios.find(oficio => oficio.nombre === nombreOficio);
    res.render('perfiles/verPerfil', { perfil, oficios, oficioSeleccionado })
})

export default router;
