import { Router } from 'express'
import { ChatController } from '../controllers/chat.controller.js'

const router = Router()

// Middleware para verificar autenticación
const isAuthenticated = (req, res, next) => {
    if (req.session.loggedin) {
        next()
    } else {
        res.redirect('/login')
    }
}

// Ruta principal para mostrar la vista del chat
router.get('/', isAuthenticated, ChatController.renderChat)

// Ruta para obtener mensajes via API
router.get('/messages', isAuthenticated, ChatController.getMessages)

// Ruta para obtener mensajes con un usuario específico
// router.get('/messages/:otherUserId', isAuthenticated, ChatController.getMessagesWith)
router.get('/:receptorId', isAuthenticated, ChatController.renderChatWithUser);

export default router