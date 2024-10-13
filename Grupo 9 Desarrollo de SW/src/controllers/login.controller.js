import {pool} from '../db.js'
import bcrypt from 'bcrypt'
import { getOficios } from "../controllers/oficio.controller.js"

export const auth = async (req, res) => {
    // seccion oficios del header
    const oficios = await getOficios(req, res, true); // Obtener todos los oficios para el select
    const nombreOficio = req.params.nombreOficio;
    const oficioSeleccionado = oficios.find(oficio => oficio.nombre === nombreOficio);

    const { email, contraseña } = req.body;

    if (email && contraseña) {
        const [rows] = await pool.query('SELECT * FROM usuario WHERE email = ?', [email]) 

        if (rows.length === 0 || !(await bcrypt.compare(contraseña, rows[0].contraseña))) {
            // return res.send('Email o contraseña incorrectos');
            res.render('login', {
                oficios,
                oficioSeleccionado,
                alert: true,
                alertTitle: "Error",
                alertMessage: "Usuario y/o password incorrectas",
                alertIcon: "error",
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            })
        } else {
            req.session.loggedin = true
            req.session.name = rows[0].nombreUsuario;
            req.session.usuarioId = rows[0].idUsuario;
            res.render('login', {
                oficios,
                oficioSeleccionado,
                alert: true,
                alertTitle: "Conexion exitosa",
                alertMessage: "LOGIN CORRECTO",
                alertIcon: "success",
                showConfirmButton: false,
                timer: 1500,
                ruta: ''
            })
        }
    } else {
        res.send('Por favor ingrese un usuario y/o una password');
    }
}



