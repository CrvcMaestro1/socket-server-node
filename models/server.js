const cors = require('cors')
const express = require('express');
const http = require('http');
const { socketController } = require('../sockets/controller.socket');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.server = http.createServer(this.app)
        this.io = require('socket.io')(this.server)

        this.path = {}
        // Middlewares
        this.middlewares();
        // Rutas
        this.routes();
        // Sockets
        this.sockets();
    }

    middlewares() {
        // CORS
        this.app.use(cors());
        // Directorio público
        this.app.use(express.static('public'));
    }

    routes() {
        // this.app.use(this.path.auth, require('../routes/auth'));
    }

    sockets() {
        this.io.on('connection', socketController)
    }

    listener() {
        this.server.listen(this.port, () => {
            console.log(`Server listening at http://localhost:${this.port}`)
        })
    }
}

module.exports = Server;