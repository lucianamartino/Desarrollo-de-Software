import { Router } from "express"
import { getOficiosFiltro } from "../controllers/oficio.controller.js"

const router = Router()

// Ruta para mostrar el formulario de creación de usuario
router.get('/chat', async (req, res) => {
    const { oficios, oficioSeleccionado } = await getOficiosFiltro(req, res);

    res.render('chat', {oficios, oficioSeleccionado}); 
});


export default router