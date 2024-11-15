import {pool} from '../db.js'

io.on('connection', async (socket) => {
    console.log('a user connected')

    socket.on('disconnect', () => {
        console.log('an user has disconnected')
    })

    socket.on('chat message', async (msg) => {
        let username = socket.handshake.auth.username ?? 'Anonymous'
        try {
            const [result] = await pool.query('INSERT INTO messages (content, Usuario_idUsuario, Receptor_idUsuario) VALUES (?, ?, ?)', [msg, 1, 2])
        } catch (e) {
            console.error(e)
            return
        }
        io.emit('chat message', msg, result.lastInsertRowid.toString(), username)
    })
})