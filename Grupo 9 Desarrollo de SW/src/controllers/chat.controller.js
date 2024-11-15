import {pool} from '../db.js'

export class ChatController {
    static async renderChat(req, res) {
        try {
            if (!req.session.loggedin) {
                return res.redirect('/login')
            }

            // Obtener lista de usuarios para el chat
            const [users] = await pool.query(
                'SELECT idUsuario, nombreUsuario FROM usuario WHERE idUsuario != ?',
                [req.session.usuarioId]
            )
            
            // Renderizar la vista con los datos necesarios
            res.render('chat', {
                users,
                currentUser: {
                    id: req.session.usuarioId,
                    name: req.session.name
                },
                // Incluir variables de sesión necesarias para el layout
                login: req.session.loggedin,
                name: req.session.name,
                usuarioId: req.session.usuarioId
            })
        } catch (error) {
            console.error('Error al renderizar chat:', error)
            res.status(500).send('Error al cargar el chat')
        }
    }

    static async getMessages(req, res) {
        try {
            const receptorId = req.query.receptorId;
            
            const [messages] = await pool.query(`
                SELECT 
                    m.*,
                    e.nombreUsuario as emisorNombre,
                    r.nombreUsuario as receptorNombre
                FROM mensaje m
                JOIN usuario e ON m.Usuario_idUsuario = e.idUsuario
                JOIN usuario r ON m.Receptor_idUsuario = r.idUsuario
                WHERE (m.Usuario_idUsuario = ? AND m.Receptor_idUsuario = ?)
                   OR (m.Usuario_idUsuario = ? AND m.Receptor_idUsuario = ?)
                ORDER BY m.fechaEnvio ASC
            `, [req.session.usuarioId, receptorId, receptorId, req.session.usuarioId]);
            
            res.json(messages);
        } catch (error) {
            console.error('Error al obtener mensajes:', error);
            res.status(500).json({ error: 'Error al cargar mensajes' });
        }
    }

    // static async getMessagesWith(req, res) {
    //     try {
    //         const { otherUserId } = req.params
    //         const [messages] = await pool.query(`
    //             SELECT 
    //                 m.*,
    //                 e.nombreUsuario as emisorNombre,
    //                 r.nombreUsuario as receptorNombre
    //             FROM mensaje m
    //             JOIN usuario e ON m.Usuario_idUsuario = e.idUsuario
    //             JOIN usuario r ON m.Receptor_idUsuario = r.idUsuario
    //             WHERE (m.Usuario_idUsuario = ? AND m.Receptor_idUsuario = ?)
    //                OR (m.Usuario_idUsuario = ? AND m.Receptor_idUsuario = ?)
    //             ORDER BY m.fechaEnvio ASC
    //         `, [req.session.usuarioId, otherUserId, otherUserId, req.session.usuarioId])
            
    //         res.json(messages)
    //     } catch (error) {
    //         console.error('Error al obtener mensajes:', error)
    //         res.status(500).json({ error: 'Error al cargar mensajes' })
    //     }
    // }

    static async saveMessage(mensaje) {
        try {
            const [result] = await pool.query(`
                INSERT INTO mensaje 
                (texto, Usuario_idUsuario, Receptor_idUsuario) 
                VALUES (?, ?, ?)
            `, [mensaje.texto, mensaje.emisorId, mensaje.receptorId])
            
            return result.insertId
        } catch (error) {
            console.error('Error al guardar mensaje:', error)
            throw error
        }
    }

    static async renderChatWithUser(req, res) {
        try {
            if (!req.session.loggedin) {
                return res.redirect('/login');
            }
            
            const receptorId = req.params.receptorId;
            
            // Obtener información del receptor
            const [receptor] = await pool.query(
                'SELECT idUsuario, nombreUsuario FROM usuario WHERE idUsuario = ?',
                [receptorId]
            );
            
            if (!receptor.length) {
                return res.status(404).send('Usuario no encontrado');
            }
    
            res.render('chat', {
                receptor: receptor[0],
                currentUser: {
                    id: req.session.usuarioId,
                    name: req.session.name
                }
            });
        } catch (error) {
            console.error('Error al renderizar chat:', error);
            res.status(500).send('Error al cargar el chat');
        }
    }   
}