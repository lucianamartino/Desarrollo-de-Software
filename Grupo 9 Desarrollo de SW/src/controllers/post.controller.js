import {pool} from '../db.js'

// Crea un nuevo post
export const createPost = async (req, res) => {
    const { descripcion, foto, rubroId, usuarioId, fecha, valoracion } = req.body;
    const [rows] = await pool.query(
        'INSERT INTO post (descripcion, foto, Rubro_idOficio, Usuario_idUsuario, fecha, valoracion) VALUES (?, ?, ?, ?, ?, ?)', 
        [descripcion, foto, rubroId, usuarioId, fecha, valoracion])

        res.redirect('/');
};

// Devuelve todos los perfiles
export const getPosts = async (req, res, asData = false) => {
    const [rows] = await pool.query('SELECT * FROM post');

    if (asData) {
        return rows;
    }

    res.json(rows);
};

// Devuelve un perfil por ID
export const getPost = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM post WHERE idPost = ?', [req.params.id]);
        
        if (rows.length <= 0) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el post' });
    }
};