import express from 'express'
import path from 'path'

import { Server } from 'socket.io'
import {createServer} from 'node:http'

import indexRoutes from './routes/index.routes.js'
import localidadRoutes from './routes/localidad.routes.js'
import oficioRoutes from './routes/oficio.routes.js'
import oficioperfilRoutes from './routes/oficioperfil.routes.js'
import perfilRoutes from './routes/perfil.routes.js';
import postsRoutes from './routes/posts.routes.js';
import provinciaRoutes from './routes/provincia.routes.js'
import reseñaRoutes from './routes/reseña.routes.js'
import rolRoutes from './routes/rol.routes.js'
import ubicacionRoutes from './routes/ubicacion.routes.js'
import usuariorolRoutes from './routes/usuariorol.routes.js'
import usuariosRoutes from './routes/usuarios.routes.js'
import loginRoutes from './routes/login.routes.js'
import chatRoutes from './routes/chat.routes.js'

import session from 'express-session'

import methodOverride from 'method-override'

import { fileURLToPath } from 'url';

const app = express()
export const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery: {}
})

// Conexion con socket.io
io.on('connection', (socket) => {
    console.log('Usuario conectado')

    socket.on('disconnect', () => {
        console.log('Usuario desconectado')
    })

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    })
})



// Usar fileURLToPath para obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../build')));
app.use(express.static(path.join(__dirname, 'public')));

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true })) // Para manejar datos de formularios

// Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

//logout
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

app.use((req, res, next) => {
    res.locals.login = req.session.loggedin || false;  // Si está logueado, será true, de lo contrario false
    res.locals.name = req.session.name || '';          // Para el nombre del usuario
    res.locals.usuarioId = req.session.usuarioId || '';          // Para el id del usuario
    next();
});


// Permite usar otros métodos HTTP en formularios
app.use(methodOverride('_method'));


// llamada a las rutas
app.use(indexRoutes)
app.use('/localidades', localidadRoutes)
app.use('/oficio', oficioRoutes)
app.use('/oficioperfil', oficioperfilRoutes)
app.use('/perfiles', perfilRoutes)
app.use('/posts', postsRoutes)
app.use('/provincias', provinciaRoutes)
app.use('/', reseñaRoutes)
app.use('/roles', rolRoutes)
app.use('/ubicaciones', ubicacionRoutes)
app.use('/usuariorol', usuariorolRoutes)
app.use('/api', usuariosRoutes)
app.use('/', loginRoutes)
app.use('/', chatRoutes)


export default app