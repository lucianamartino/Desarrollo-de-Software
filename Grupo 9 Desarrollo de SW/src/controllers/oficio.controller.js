import {pool} from '../db.js'

// Crea un nuevo oficio
export const createOficio = async (req, res) => {
    const { nombre, descripcion } = req.body;
    const [rows] = await pool.query(
        'INSERT INTO oficio (nombre, descripcion) VALUES (?, ?)', 
        [nombre, descripcion])
        
        res.redirect('/');
};

// Devuelve todos los oficios
export const getOficios = async (req, res, asData = false) => {
    const [rows] = await pool.query('SELECT * FROM oficio');
    
    if (asData) {
        return rows;
    }

    res.json(rows);
};

// Devuelve un oficio por ID
export const getOficio = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM oficio WHERE idOficio = ?', [req.params.id]);
        
        if (rows.length <= 0) {
            return res.status(404).json({ message: 'oficio no encontrado' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener oficio' });
    }
};
