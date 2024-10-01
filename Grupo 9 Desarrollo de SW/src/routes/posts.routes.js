import { Router } from "express";
import { createPost, getPosts, getPost} from '../controllers/post.controller.js';

const router = Router();

// Ruta para manejar la creación de perfil (POST)
router.post('/create', createPost);

// Obtener todos los perfiles
router.get('/', getPosts);

// Obtener perfil por ID
router.get('/:id', getPost);

export default router;