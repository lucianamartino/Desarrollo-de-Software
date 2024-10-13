import { Router } from "express";
import { getOficios } from "../controllers/oficio.controller.js"
import { auth } from "../controllers/login.controller.js";

const router = Router();

router.get('/login', async (req, res) => {
    const oficios = await getOficios(req, res, true); // Obtener todos los oficios para el select
    const nombreOficio = req.params.nombreOficio;

    // Obtener el id del oficio que seleccionaste
    const oficioSeleccionado = oficios.find(oficio => oficio.nombre === nombreOficio);


    res.render('login', {oficios, oficioSeleccionado})
})

router.post('/auth', auth)

export default router;


