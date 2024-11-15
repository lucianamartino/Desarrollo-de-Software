import { server } from './app.js'
import {PORT} from './config.js'

server.listen(PORT)
console.log('Server running on port', PORT)