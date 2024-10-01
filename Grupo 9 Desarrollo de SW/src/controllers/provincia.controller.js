import {pool} from '../db.js'

// Crea un nueva provincia
export const createProvincia = async (req, res) => {
    const { nombre } = req.body;
    const [rows] = await pool.query(
        'INSERT INTO provincia (nombre) VALUES (?)', 
        [nombre])

        res.redirect('/');
};

// Devuelve todas las provincias
export const getProvincias = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM provincia');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener oficios' });
    }
};

// Devuelve una provincia por ID
export const getProvincia = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM provincia WHERE idProvincia = ?', [req.params.id]);
        
        if (rows.length <= 0) {
            return res.status(404).json({ message: 'provincia no encontrado' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener provincia' });
    }
};
