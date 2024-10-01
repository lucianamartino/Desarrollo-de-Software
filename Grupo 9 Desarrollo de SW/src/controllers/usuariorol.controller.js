import {pool} from '../db.js'

// Crea un nuevo usuariorol
export const createUsuarioRol = async (req, res) => {
    const { cantidad, rolId, usuarioId } = req.body;
    const [rows] = await pool.query(
        'INSERT INTO usuariorol (cantidad, Rol_idRol, Usuario_idUsuario) VALUES (?, ?, ?, ?, ?)', 
        [cantidad, rolId, usuarioId])

        res.redirect('/');
};

// Devuelve todos los usuariosrol
export const getUsuariosRol = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuariorol');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener usuarios roles' });
    }
};

// Devuelve un usuariorol por ID
export const getUsuarioRol = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuariorol WHERE idUsuarioRol = ?', [req.params.id]);
        
        if (rows.length <= 0) {
            return res.status(404).json({ message: 'usuariorol no encontrado' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener usuariorol' });
    }
};
