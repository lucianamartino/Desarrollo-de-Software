import {pool} from '../db.js'

// Crea un nueva reseña
export const createReseña = async (req, res) => {
    const { valoracion, descripcion } = req.body;
    const perfilId = req.session.usuarioId
    const perfilDestinoId = req.params.id

    const [rows] = await pool.query(
        'INSERT INTO reseña (valoracion, descripcion, Perfil_idPerfil, Perfil_destino_idPerfil) VALUES (?, ?, ?, ?)', 
        [valoracion, descripcion, perfilId, perfilDestinoId])

        res.redirect(`/perfiles/${perfilDestinoId}`);
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

        return rows
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener reseña' });
    }
};

// Trae las reseñas de un perfil y el perfil que la realizo
export const getReseñaConPerfil = async (req, res) => {
    try {
        const usuarioId = req.params.id; // O la forma correcta de obtener el ID
        
        // Realiza la consulta necesaria para obtener reseñas y perfiles
        const [reseñas] = await pool.query('SELECT * FROM reseña WHERE Perfil_destino_idPerfil = ?', [usuarioId]);
        const [perfilReseña] = await pool.query('SELECT * FROM perfil WHERE idPerfil IN (SELECT Perfil_idPerfil FROM reseña WHERE Perfil_destino_idPerfil = ?)', [usuarioId]);
        const [[promedioResena]] = await pool.query('SELECT AVG(valoracion) AS promedio FROM reseña WHERE Perfil_destino_idPerfil = ?', [usuarioId]);

        const promedio = parseFloat(promedioResena.promedio) || 0; // Convierte a número y usa 0 si es NaN

        return { reseñas, perfilReseña, promedio}; // Asegúrate de que esto retorne un objeto
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener reseñas y perfiles' });
        return undefined; // Esto puede ser necesario si hay un error
    }
};


