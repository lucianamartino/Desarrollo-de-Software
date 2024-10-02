import express from 'express'
import path from 'path'

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

import { fileURLToPath } from 'url';

const app = express()

// Usar fileURLToPath para obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, 'public')));

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true })) // Para manejar datos de formularios

// llamada a las rutas
app.use(indexRoutes)
app.use('/localidades', localidadRoutes)
app.use('/oficio', oficioRoutes)
app.use('/oficioperfil', oficioperfilRoutes)
app.use('/perfiles', perfilRoutes)
app.use('/posts', postsRoutes)
app.use('/provincias', provinciaRoutes)
app.use('/resenas', reseñaRoutes)
app.use('/roles', rolRoutes)
app.use('/ubicaciones', ubicacionRoutes)
app.use('/usuariorol', usuariorolRoutes)
app.use('/api', usuariosRoutes)


export default app