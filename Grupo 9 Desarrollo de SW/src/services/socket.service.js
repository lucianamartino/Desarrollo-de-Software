import { Server } from 'socket.io'
import { ChatController } from '../controllers/chat.controller.js'

export class SocketService {
    constructor(server) {
        this.io = new Server(server)
        this.connectedUsers = new Map()
        this.userSockets = new Map() // Nuevo: mapear usuarios a sus sockets
    }

    initialize() {
        this.io.on('connection', (socket) => {
            console.log('Nuevo cliente conectado')

            socket.on('authenticate', (userData) => {
                this.connectedUsers.set(socket.id, userData.userId)
                this.userSockets.set(userData.userId, socket.id) // Guardar relación usuario-socket
                socket.emit('authenticated')
                this.broadcastUserStatus(userData.userId, true)
            })

            socket.on('send_message', async (data) => {
                try {
                    const emisorId = this.connectedUsers.get(socket.id)
                    const mensaje = {
                        texto: data.texto,
                        emisorId: emisorId,
                        receptorId: data.receptorId,
                    }

                    // Guardar mensaje y obtener datos completos
                    const messageId = await ChatController.saveMessage(mensaje)
                    const mensajeCompleto = {
                        idMensaje: messageId,
                        texto: data.texto,
                        Usuario_idUsuario: emisorId,
                        Receptor_idUsuario: data.receptorId,
                        fecha: new Date(),
                        emisorNombre: data.emisorNombre
                    }

                    // Enviar al receptor
                    const recipientSocketId = this.userSockets.get(data.receptorId)
                    if (recipientSocketId) {
                        this.io.to(recipientSocketId).emit('new_message', mensajeCompleto)
                    }

                    // Enviar confirmación al emisor
                    socket.emit('message_sent', mensajeCompleto)

                } catch (error) {
                    console.error('Error al procesar mensaje:', error)
                    socket.emit('error', 'Error al enviar mensaje')
                }
            })

            socket.on('disconnect', () => {
                const userId = this.connectedUsers.get(socket.id)
                this.connectedUsers.delete(socket.id)
                this.userSockets.delete(userId)
                this.broadcastUserStatus(userId, false)
            })
        })
    }

    broadcastUserStatus(userId, online) {
        this.io.emit('user_status_change', { userId, online })
    }
}