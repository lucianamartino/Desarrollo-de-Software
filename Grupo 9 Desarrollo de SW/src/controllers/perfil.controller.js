import {pool} from '../db.js'

// Crea un nuevo perfil
export const createPerfil = async (req, res) => {
    const { descripcion, telefono, nombre, apellido, fechaNacimiento, usuarioId, localidadId } = req.body;
    const valoracionPromedio = 5
    const [rows] = await pool.query(
        'INSERT INTO perfil (descripcion, valoracionPromedio, telefono, nombre, apellido, fechaNacimiento, Usuario_idUsuario, Localidad_idLocalidad) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
        [descripcion, valoracionPromedio, telefono, nombre, apellido, fechaNacimiento, usuarioId, localidadId])

        res.redirect('/');
};

// Devuelve todos los perfiles
export const getPerfiles = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM perfil');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener perfiles' });
    }
};

// Devuelve un perfil por ID
export const getPerfil = async (req, res, asData = false) => {
    try {
        const [rows] = await pool.query('SELECT nombre,apellido,descripcion,telefono,Localidad_idLocalidad,valoracionPromedio FROM perfil WHERE Usuario_idUsuario = ?', [req.params.id]);
        
        if (rows.length <= 0) {
            return res.status(404).json({ message: 'Perfil no encontrado' });
        }

        if (asData) {
            return rows[0];
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el perfil' });
    }
};

export const getPerfilPorUsuarioId = async (usuarioId, req, res) => {
    try {
        const [perfil] = await pool.query('SELECT * FROM perfil WHERE Usuario_idUsuario = ?', [usuarioId]);

        // Verifica que el perfil fue encontrado
        if (perfil.length === 0) {
            return null; // No se encontró el perfil
        }

        return perfil[0]; // Retorna el primer perfil encontrado
    } catch (error) {
        console.error('Error al obtener el perfil:', error);
        res.status(500).send('Error del servidor');
        return null; // Manejo de error, retornar null
    }
};
