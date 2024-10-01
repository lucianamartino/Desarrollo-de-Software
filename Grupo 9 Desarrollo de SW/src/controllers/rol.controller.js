import {pool} from '../db.js'

// Crea un nuevo rol
export const createRol = async (req, res) => {
    const { nombre } = req.body;
    const [rows] = await pool.query(
        'INSERT INTO rol (nombre) VALUES (?)', 
        [nombre])

        res.redirect('/');
};

// Devuelve todos los roles
export const getRoles = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM rol');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener roles' });
    }
};

// Devuelve un rol por ID
export const getRol = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM rol WHERE idRol = ?', [req.params.id]);
        
        if (rows.length <= 0) {
            return res.status(404).json({ message: 'rol no encontrado' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener rol' });
    }
};
