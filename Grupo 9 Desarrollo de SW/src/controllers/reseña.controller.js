import {pool} from '../db.js'

// Crea un nueva reseña
export const createReseña = async (req, res) => {
    const { valoracion, descripcion, postId } = req.body;
    const [rows] = await pool.query(
        'INSERT INTO reseña (valoracion, descripcion, Post_idPost) VALUES (?, ?, ?)', 
        [valoracion, descripcion, postId])

        res.redirect('/');
};

// Devuelve todas las reseña
export const getReseñas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM reseña');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener reseña' });
    }
};

// Devuelve una reseña por ID
export const getReseña = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM reseña WHERE idReseña = ?', [req.params.id]);
        
        if (rows.length <= 0) {
            return res.status(404).json({ message: 'reseña no encontrado' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener reseña' });
    }
};
