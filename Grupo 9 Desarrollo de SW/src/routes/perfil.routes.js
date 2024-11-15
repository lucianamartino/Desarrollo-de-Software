import { Router } from "express";
import { createPerfil, getPerfil, updatePerfil } from '../controllers/perfil.controller.js';
import { getLocalidades } from '../controllers/localidad.controller.js';
import { getProvincias } from '../controllers/provincia.controller.js';
import { getOficiosFiltro } from '../controllers/oficio.controller.js';
import { getPostPorPerfil } from '../controllers/post.controller.js';
import { getReseñaConPerfil } from '../controllers/reseña.controller.js';
import upload from '../middlewares/multer.js';

const router = Router();

// crear perfil
router.get('/create', async (req, res) =>{
    const usuarioId = req.query.usuarioId; // Obtener el ID del usuario de la consulta de la URL
    const provincias = await getProvincias(req, res, true)
    const localidades = await getLocalidades(req, res, true)

    const { oficios, oficioSeleccionado } = await getOficiosFiltro(req, res);

    if (!req.session.tempUsuario) {
        return res.redirect('/api/usuarios/create');
    }
    
    res.render('perfiles/createPerfil', { usuarioId, provincias, localidades, oficioSeleccionado, oficios }); // Pasar el ID del usuario a la vista
})

// Ruta para manejar la creación de perfil (POST)
router.post('/create', upload.single('foto'), createPerfil);

// perfil por id
router.get('/:id', async (req, res) => {
    const usuarioId = req.params.id; // Obtener el ID de usuario desde la URL
    const perfil = await getPerfil(req, res);

    if (!perfil) {
        return res.status(404).send('Perfil no encontrado');
    }

    const { oficios, oficioSeleccionado } = await getOficiosFiltro(req, res);

    const postPerfil=  await getPostPorPerfil(usuarioId, req, res)

    // const reseñas = await getReseña(req, res)
    const { reseñas, perfilReseña, promedio } = await getReseñaConPerfil(req, res)

    const login = req.session.loggedin;
    const usuarioIdLog = req.session.usuarioId

    res.render('perfiles/verPerfil', { usuarioId, perfil, oficios, oficioSeleccionado, postPerfil, login, usuarioIdLog, reseñas, perfilReseña, promedio })
})


// actualizar perfil
router.get('/update/:id', async (req, res) => {
    // const usuarioId = req.params.id;
    const perfil = await getPerfil(req, res)

    const { oficios, oficioSeleccionado } = await getOficiosFiltro(req, res);

    const login = req.session.loggedin;
    const usuarioIdLog = req.session.usuarioId

    if(req.session.loggedin) {
        res.render('perfiles/actualizarPerfil', { perfil, oficios, oficioSeleccionado, usuarioIdLog })
    } else {
        res.redirect('/')
    }
})

router.put('/update/:id', upload.single('foto'), updatePerfil);

export default router;
