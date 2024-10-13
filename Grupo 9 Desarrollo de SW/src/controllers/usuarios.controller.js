import {pool} from '../db.js'
import bcrypt from 'bcrypt'
import { getOficiosFiltro } from "../controllers/oficio.controller.js"

// Devuelve todos los usuarios
export const getUsuarios = async (req, res, asData = false) => {
    const [rows] = await pool.query('SELECT * FROM usuario')
    
    if (asData) {
        return rows; // Retorna los usuarios en lugar de enviar JSON
    }

    res.json(rows);

    // res.send(rows)
}

// Devuelve un usuario por ID
export const getUsuario = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM usuario WHERE idUsuario = ?', [req.params.id])
    
    if (rows.length <= 0 ) return res.status(404).json({
        message: 'Usuario not found'
    })

    res.json(rows[0])
}

export const createUsuario = async (req, res) => {
    const { nombreUsuario, email, contraseña } = req.body;
    const { oficios, oficioSeleccionado } = await getOficiosFiltro(req, res);
    const error = {}

    const [rows] = await pool.query('SELECT * FROM usuario WHERE email = ? OR nombreUsuario = ?', [email, nombreUsuario]);

    if (rows.length > 0) {
        if (rows[0].email === email) {
            error.email = 'El email ya está en uso';
        }
        if (rows[0].nombreUsuario === nombreUsuario) {
            error.nombreUsuario = 'El nombre de usuario ya está en uso';
        }
        // Redirigir de nuevo a la vista y pasar el error
        return res.render('usuarios/createUsuario', { error, oficios, oficioSeleccionado });
    }

    const contraseñaHash = await bcrypt.hash(contraseña, 8);
    // Guarda los datos del usuario en la sesión temporalmente
    req.session.tempUsuario = {
        nombreUsuario,
        email,
        contraseñaHash
    };

    res.redirect(`/perfiles/create`);
};


// Actualiza un usuario
export const updateUsuario = async (req, res) => {
    const {id} = req.params
    const {contraseña, nombre, apellido, email} = req.body 

    const [result] = await pool.query('UPDATE usuario SET nombreUsuario = IFNULL(?, nombreUsuario), contraseña = IFNULL(?, contraseña), email = IFNULL(?, email) WHERE idUsuario = ?', 
        [contraseña, nombre, apellido, email, id])

    if(result.affectedRows <= 0) return res.status(404).json({
        message: 'Usuario not found'
    })

    const [rows] = await pool.query('SELECT * FROM usuario WHERE idUsuario = ?', [id])

    res.json(rows[0])
}

// Elimina un usuario
export const deleteUsuario = async (req, res) => {
    const [result] = await pool.query('DELETE FROM usuario WHERE idUsuario = ?', [req.params.id])

    if(result.affectedRows <= 0) return res.status(404).json({
        message: 'Not found'
    })

    res.sendStatus(204)
}