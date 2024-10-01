import {pool} from '../db.js'

// Crea un nuevo oficioPerfil
export const createOficioPerfil = async (req, res) => {
    const { cantidad, perfilId, oficioId } = req.body;
    const [rows] = await pool.query(
        'INSERT INTO oficioperfil (cantidad, Perfil_idPerfil, Oficio_idOficio) VALUES (?, ?, ?)', 
        [cantidad, perfilId, oficioId])

        res.redirect('/');
};

// Devuelve todos los oficioPerfil
export const getOficiosPerfil = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM oficioperfil');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener oficios' });
    }
};

// Devuelve un oficioPerfil por ID
export const getOficioPerfil = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM oficioperfil WHERE idOficioPerfil = ?', [req.params.id]);
        
        if (rows.length <= 0) {
            return res.status(404).json({ message: 'oficio no encontrado' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener oficio' });
    }
};
