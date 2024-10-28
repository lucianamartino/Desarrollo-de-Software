import {pool} from '../db.js'

export const createPost = async (req, res) => {
    const { descripcion, oficioId } = req.body;
    const usuarioId = req.session.usuarioId;
    const valoracion = 5;

    // Obtén los nombres de los archivos subidos
    const fotos = req.files.map(file => file.filename); // Nombres de los archivos subidos
    const fotosJSON = JSON.stringify(fotos); // Convierte el array a JSON

    // Inserta los datos en la base de datos
    const [rows] = await pool.query(
        'INSERT INTO post (despcripcion, foto, Oficio_idOficio, Usuario_idUsuario, valoracion) VALUES (?, ?, ?, ?, ?)',
        [descripcion, fotosJSON, oficioId, usuarioId, valoracion] // Asegúrate de que se use la variable fotosJSON
    );

    res.redirect('/');
};

export const getPosts = async (req, res, asData = false) => {
    const [rows] = await pool.query(`
        SELECT post.*, perfil.nombre AS nombrePerfil, perfil.apellido AS apellidoPerfil, provincia.nombre AS nombreProvincia, localidad.nombre AS nombreLocalidad
        FROM post
        JOIN usuario ON post.Usuario_idUsuario = usuario.idUsuario
        JOIN perfil ON perfil.Usuario_idUsuario = usuario.idUsuario
        JOIN localidad ON perfil.Localidad_idLocalidad = idLocalidad
        JOIN provincia ON localidad.Provincia_idProvincia = idProvincia
    `);

    // Verificar y deserializar
    rows.forEach(row => {
        if (row.foto) {
            try {
                row.foto = JSON.parse(row.foto); // Intenta convertir a array
            } catch (error) {
                console.error('Error al parsear foto:', error);
                row.foto = []; // Asignar un array vacío si hay un error
            }
        } else {
            row.foto = []; // Si no hay foto, asignar un array vacío
        }
    });

    if (asData) {
        return rows;
    }

    res.json(rows);
};

// Devuelve un post por ID
export const getPost = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                post.*,
                perfil.nombre AS nombrePerfil,
                perfil.apellido AS apellidoPerfil,
                perfil.foto AS fotoPerfil,
                oficio.nombre AS nombreOficio
            FROM post
            JOIN usuario ON usuario.idUsuario = post.Usuario_idUsuario
            JOIN perfil ON perfil.Usuario_idUsuario = usuario.idUsuario
            JOIN oficio ON oficio.idOficio = post.Oficio_idOficio
            WHERE idPost = ?`, [req.params.id]);

        // Verificar y deserializar
        rows.forEach(row => {
        if (row.foto) {
            try {
                row.foto = JSON.parse(row.foto); // Intenta convertir a array
            } catch (error) {
                console.error('Error al parsear foto:', error);
                row.foto = []; // Asignar un array vacío si hay un error
            }
        } else {
            row.foto = []; // Si no hay foto, asignar un array vacío
        }
    });
        
        if (rows.length <= 0) {
            return res.status(404).json({ message: 'Post no encontrado' }); // No se encontró el post
        }

        return rows[0]; // Retorna el primer post encontrado
    } catch (error) {
        console.error('Error al obtener el post:', error);
        return res.status(500).json({ message: 'Error al obtener el post' });
    }
};

export const getPostsPorOficio = async (req, res) => {
    const { nombreOficio } = req.params;

    const [rows] = await pool.query(`
        SELECT post.*, perfil.nombre AS nombrePerfil, perfil.apellido AS apellidoPerfil, provincia.nombre AS nombreProvincia, localidad.nombre AS nombreLocalidad
        FROM post
        JOIN usuario ON post.Usuario_idUsuario = usuario.idUsuario
        JOIN perfil ON perfil.Usuario_idUsuario = usuario.idUsuario
        JOIN localidad ON perfil.Localidad_idLocalidad = idLocalidad
        JOIN provincia ON localidad.Provincia_idProvincia = idProvincia
        JOIN oficio ON post.Oficio_idOficio = oficio.idOficio
        WHERE oficio.nombre = ?
    `, [nombreOficio]);

    // Verificar y deserializar
    rows.forEach(row => {
        if (row.foto) {
            try {
                row.foto = JSON.parse(row.foto); // Intenta convertir a array
            } catch (error) {
                console.error('Error al parsear foto:', error);
                row.foto = []; // Asignar un array vacío si hay un error
            }
        } else {
            row.foto = []; // Si no hay foto, asignar un array vacío
        }
    });

    return rows;
};

export const getPostPorPerfil = async (usuarioId, req, res) => {
    const [rows] = await pool.query(`
        SELECT post.*, perfil.nombre AS nombrePerfil, perfil.apellido AS apellidoPerfil, provincia.nombre AS nombreProvincia, localidad.nombre AS nombreLocalidad
        FROM post
        JOIN usuario ON post.Usuario_idUsuario = usuario.idUsuario
        JOIN perfil ON perfil.Usuario_idUsuario = usuario.idUsuario
        JOIN localidad ON perfil.Localidad_idLocalidad = idLocalidad
        JOIN provincia ON localidad.Provincia_idProvincia = idProvincia
        WHERE post.Usuario_idUsuario = ?`,
        [usuarioId]
    );

    // Verificar y deserializar
    rows.forEach(row => {
        if (row.foto) {
            try {
                row.foto = JSON.parse(row.foto); // Intenta convertir a array
            } catch (error) {
                console.error('Error al parsear foto:', error);
                row.foto = []; // Asignar un array vacío si hay un error
            }
        } else {
            row.foto = []; // Si no hay foto, asignar un array vacío
        }
    });

    return rows;
}

export const deletePost = async (req, res) => {
    const postId = req.params.id;
    console.log('Eliminando post con id:', postId); // Verifica el id del post en la consola

    try {
        await pool.query('DELETE FROM post WHERE idPost = ?', [postId]);
        res.redirect('/perfiles/1');
    } catch (error) {
        console.error('Error al eliminar el post:', error);
        res.status(500).send('Error del servidor');
    }
}