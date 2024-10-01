import {pool} from '../db.js'

// Crea una nueva provincia
export const createLocalidad = async (req, res) => {
    const { nombre, provinciaId, perfilId } = req.body;
    const [rows] = await pool.query(
        'INSERT INTO localidad (nombre, Provincia_idProvincia, Perfil_idPerfil) VALUES (?, ?)', 
        [nombre, provinciaId, perfilId])

        res.redirect('/');
};

// Devuelve todos las provincias
export const getLocalidades = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM localidad');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener localidades' });
    }
};

// Devuelve un perfil por ID
export const getLocalidad = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM provincia WHERE idLocalidad = ?', [req.params.id]);
        
        if (rows.length <= 0) {
            return res.status(404).json({ message: 'localidad no encontrada' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la localidad' });
    }
};
