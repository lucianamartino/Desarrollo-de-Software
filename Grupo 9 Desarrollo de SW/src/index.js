import app from './app.js'
import {PORT} from './config.js'
import { createServer } from 'http'
import { SocketService } from './services/socket.service.js'

const server = createServer(app)

// Inicializar Socket.IO
const socketService = new SocketService(server)
socketService.initialize()

server.listen(PORT)
console.log('Server running on port', PORT)