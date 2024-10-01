import {pool} from '../db.js'

// Crea una nueva ubicacion
export const createUbicacion = async (req, res) => {
    const { calle, numero, dpto, perfilId, localidadId } = req.body;
    const [rows] = await pool.query(
        'INSERT INTO ubicacion (calle, numero, dpto, Perfil_idPerfil, Localidad_idLocalidad) VALUES (?, ?, ?, ?, ?)', 
        [calle, numero, dpto, perfilId, localidadId])

        res.redirect('/');
};

// Devuelve todas las ubicaciones
export const getUbicaciones = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM ubicacion');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener ubicaciones' });
    }
};

// Devuelve una ubicacion por ID
export const getUbicacion = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM ubicacion WHERE idUbicacion = ?', [req.params.id]);
        
        if (rows.length <= 0) {
            return res.status(404).json({ message: 'ubicacion no encontrado' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener ubicacion' });
    }
};
