import { Router } from "express";
import { getOficiosFiltro } from "../controllers/oficio.controller.js"
import { auth } from "../controllers/login.controller.js";

const router = Router();

router.get('/login', async (req, res) => {
    const { oficios, oficioSeleccionado } = await getOficiosFiltro(req, res);


    res.render('login', {oficios, oficioSeleccionado})
})

router.post('/auth', auth)

export default router;


