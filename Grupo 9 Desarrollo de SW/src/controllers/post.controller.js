import {pool} from '../db.js'

// Crea un nuevo post
export const createPost = async (req, res) => {
    const { descripcion, oficioId, valoracion } = req.body;
    const usuarioId = 1
    const foto = req.file ? req.file.filename : null; // Obtén el nombre del archivo subido

    // Inserta los datos en la base de datos
    const [rows] = await pool.query(
        'INSERT INTO post (despcripcion, foto, Oficio_idOficio, Usuario_idUsuario, valoracion) VALUES (?, ?, ?, ?, ?)',
        [descripcion, foto, oficioId, usuarioId, valoracion])

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