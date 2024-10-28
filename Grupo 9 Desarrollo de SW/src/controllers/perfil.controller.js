import {pool} from '../db.js'

export const createPerfil = async (req, res) => {
    const { descripcion, telefono, nombre, apellido, fechaNacimiento, localidadId } = req.body;
    const valoracionPromedio = 5
    const fotoGenerica = 'img/fotoPerfil.webp'
    const foto = req.file ? req.file.filename : fotoGenerica;

    // Verificar si los datos temporales del usuario están
    if (!req.session.tempUsuario) {
        return res.redirect('/api/usuarios/create');
    }

    const { nombreUsuario, email, contraseñaHash } = req.session.tempUsuario;

    const connection = await pool.getConnection();

    try {

        await connection.beginTransaction();  // Iniciar la transacción

        // Insertar el usuario en la base de datos
        const [rows] = await connection.query(
            'INSERT INTO usuario (nombreUsuario, email, contraseña) VALUES (?, ?, ?)', 
            [nombreUsuario, email, contraseñaHash]
        );

        const usuarioId = rows.insertId;

        await connection.query(
            'INSERT INTO perfil (descripcion, valoracionPromedio, telefono, nombre, apellido, fechaNacimiento, Usuario_idUsuario, Localidad_idLocalidad, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [descripcion, valoracionPromedio, telefono, nombre, apellido, fechaNacimiento, usuarioId, localidadId, foto]
        );

        await connection.commit();  // Confirmar la transacción

        // Limpia los datos temporales del usuario
        delete req.session.tempUsuario;

        res.redirect('/');
    } catch (error) {
        await connection.rollback();  // Deshace la transacción en caso de error
        console.error('Error al crear usuario y perfil:', error);
        res.render('createPerfil', { error: 'Hubo un problema al crear el perfil. Inténtalo de nuevo.', oficios });
    } finally {
        connection.release();  // Liberar la conexión
    }
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
export const getPerfil = async (usuarioId, req, res) => {
    try {
        const [perfil] = await pool.query(`
            SELECT 
                perfil.*,  
                provincia.nombre AS nombreProvincia, 
                localidad.nombre AS nombreLocalidad, 
                GROUP_CONCAT(oficio.nombre) AS nombreOficios
            FROM perfil
            JOIN localidad ON perfil.Localidad_idLocalidad = idLocalidad
            JOIN provincia ON localidad.Provincia_idProvincia = idProvincia
            JOIN post ON post.Usuario_idUsuario = perfil.Usuario_idUsuario
            JOIN oficio ON oficio.idOficio = post.Oficio_idOficio
            WHERE idPerfil = ?
            GROUP BY perfil.idPerfil
        `, [usuarioId]);

        // Verifica que el perfil fue encontrado
        if (perfil.length === 0) {
            return null; // No se encontró el perfil
        }

        // Divide el string en un array de nombres de oficios
        perfil[0].nombreOficios = perfil[0].nombreOficios.split(',');

        return perfil[0]; // Retorna el primer perfil encontrado
    } catch (error) {
        console.error('Error al obtener el perfil:', error);
        res.status(500).send('Error del servidor');
        return null; // Manejo de error, retornar null
    }
};


// export const updatePerfil = async (req, res) => {
//     try {
//         const { id } = req.params
//         const { descripcion, telefono } = req.body;
//         const fotoGenerica = 'img/fotoPerfil.webp'
//         const foto = req.file ? req.file.filename : fotoGenerica;

//         await pool.query('UPDATE perfil SET descripcion = IFNULL(?, descripcion), telefono = IFNULL(?, telefono), foto = IFNULL(?, foto) WHERE idPerfil = ?', [descripcion, telefono, foto, id])

//         const [rows] = await pool.query('SELECT Usuario_idUsuario FROM perfil WHERE idPerfil = ?', [id])

//         res.redirect(`/perfiles/${rows[0].Usuario_idUsuario}`);

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Error interno del servidor' });
//     }
// }

export const updatePerfil = async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion, telefono } = req.body;
        const fotoGenerica = 'img/fotoPerfil.webp';
        const foto = req.file ? req.file.filename : null; // Cambiar a null si no se sube archivo

        // Comienza construyendo la consulta
        let query = 'UPDATE perfil SET descripcion = IFNULL(?, descripcion), telefono = IFNULL(?, telefono)';
        const values = [descripcion, telefono];

        // Solo actualiza la foto si se sube una nueva imagen
        if (foto) {
            query += ', foto = ?';
            values.push(foto);
        }

        query += ' WHERE idPerfil = ?';
        values.push(id);

        // Ejecuta la consulta
        await pool.query(query, values);

        const [rows] = await pool.query('SELECT Usuario_idUsuario FROM perfil WHERE idPerfil = ?', [id]);

        res.redirect(`/perfiles/${rows[0].Usuario_idUsuario}`);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}
