import { Router } from "express";
import { createPerfil, getPerfil, updatePerfil } from '../controllers/perfil.controller.js';
import { getLocalidades } from '../controllers/localidad.controller.js';
import { getProvincias } from '../controllers/provincia.controller.js';
import { getOficiosFiltro } from '../controllers/oficio.controller.js';
import { getPostPorPerfil } from '../controllers/post.controller.js';

const router = Router();

// crear perfil
router.get('/create', async (req, res) =>{
    const usuarioId = req.query.usuarioId; // Obtener el ID del usuario de la consulta de la URL
    const provincias = await getProvincias(req, res, true)
    const localidades = await getLocalidades(req, res, true)

    const { oficios, oficioSeleccionado } = await getOficiosFiltro(req, res);

    res.render('perfiles/createPerfil', { usuarioId, provincias, localidades, oficioSeleccionado, oficios }); // Pasar el ID del usuario a la vista
})

// Ruta para manejar la creación de perfil (POST)
router.post('/create', createPerfil);

// perfil por id
router.get('/:id', async (req, res) => {
    const usuarioId = req.params.id; // Obtener el ID de usuario desde la URL
    const perfil = await getPerfil(usuarioId, req, res);

    if (!perfil) {
        return res.status(404).send('Perfil no encontrado');
    }

    const { oficios, oficioSeleccionado } = await getOficiosFiltro(req, res);

    const postPerfil=  await getPostPorPerfil(usuarioId, req, res)

    const login = req.session.loggedin;
    const usuarioIdLog = req.session.usuarioId

    res.render('perfiles/verPerfil', { usuarioId, perfil, oficios, oficioSeleccionado, postPerfil, login, usuarioIdLog })
})


// actualizar perfil
router.get('/update/:id', async (req, res) => {
    const usuarioId = req.params.id;
    const perfil = await getPerfil(usuarioId, req, res)

    res.render('perfiles/actualizarPerfil', { perfil })
})

router.put('/update/:id', updatePerfil);

export default router;
