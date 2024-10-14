import { Router } from "express";
import { createPerfil, getPerfiles, getPerfil, getPerfilPorUsuarioId } from '../controllers/perfil.controller.js';
import { getLocalidades } from '../controllers/localidad.controller.js';
import { getProvincias } from '../controllers/provincia.controller.js';
import { getOficiosFiltro } from '../controllers/oficio.controller.js';
import { getPostPorPerfil } from '../controllers/post.controller.js';

const router = Router();

router.get('/create', async (req, res) =>{
    const usuarioId = req.query.usuarioId; // Obtener el ID del usuario de la consulta de la URL
    const provincias = await getProvincias(req, res, true)
    const localidades = await getLocalidades(req, res, true)

    const { oficios, oficioSeleccionado } = await getOficiosFiltro(req, res);

    res.render('perfiles/createPerfil', { usuarioId, provincias, localidades, oficioSeleccionado, oficios }); // Pasar el ID del usuario a la vista
})

// Ruta para manejar la creación de perfil (POST)
router.post('/create', createPerfil);

router.get('/', getPerfiles); // Obtener todos los perfiles

router.get('/:id', async (req, res) => {
    const usuarioId = req.params.id; // Obtener el ID de usuario desde la URL
    const perfil = await getPerfilPorUsuarioId(usuarioId, req, res);

    if (!perfil) {
        return res.status(404).send('Perfil no encontrado');
    }

    const { oficios, oficioSeleccionado } = await getOficiosFiltro(req, res);

    const postPerfil=  await getPostPorPerfil(usuarioId, req, res)
    

    res.render('perfiles/verPerfil', { perfil, oficios, oficioSeleccionado, postPerfil })
})

export default router;
