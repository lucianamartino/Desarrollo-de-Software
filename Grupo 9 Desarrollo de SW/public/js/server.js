const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configuración de conexión a MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'tu_usuario',      // Reemplaza con tu usuario de MySQL
    password: 'tu_contraseña', // Reemplaza con tu contraseña de MySQL
    database: 'tu_base_de_datos' // Reemplaza con el nombre de tu base de datos
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado a MySQL!');
});

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta para guardar el post
app.post('/add-post', (req, res) => {
    const { postTitle, postCategory, postDescription } = req.body;

    const sql = 'INSERT INTO posts (title, category, description) VALUES (?, ?, ?)';
    connection.query(sql, [postTitle, postCategory, postDescription], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al guardar el post');
        }
        res.status(200).send('Post guardado con éxito');
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
