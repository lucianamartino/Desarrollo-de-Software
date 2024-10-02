import {pool} from '../db.js'
import { getLocalidades } from '../controllers/localidad.controller.js';

// Funcion para mostrar el formulario de creacion de perfil
export const showCreatePerfilForm = async (req, res) => {
    const usuarioId = req.query.usuarioId; // Obtener el ID del usuario de la consulta de la URL
    const localidades = await getLocalidades(req, res, true)
    res.render('perfiles/createPerfil', { usuarioId, localidades }); // Pasar el ID del usuario a la vista
};

// Crea un nuevo perfil
export const createPerfil = async (req, res) => {
    const { descripcion, valoracionPromedio, telefono, nombre, apellido, fechaNacimiento, usuarioId, localidadId } = req.body;
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
export const getPerfil = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM perfil WHERE idPerfil = ?', [req.params.id]);
        
        if (rows.length <= 0) {
            return res.status(404).json({ message: 'Perfil no encontrado' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el perfil' });
    }
};
