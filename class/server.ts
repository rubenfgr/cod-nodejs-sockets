

import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';

export default class Server {

    private static _instance: Server;

    public app: express.Application
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);

        this.io = socketIO(this.httpServer);

        this.listenSockets();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    private listenSockets() {   

        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', client => {

            // Conectar client
            socket.conectarClient(client, this.io);

            // Configuración de usuario
            socket.configurarUsuario(client, this.io);

            // Obtener usuarios activos
            socket.obtenerUsuarios(client, this.io);
            
            // Messages
            socket.message(client, this.io);

            // Disconect
            socket.disconnect(client, this.io);
        });
    }

    // =========================================
    //      Mostrar página para desarrollo
    // =========================================

    start() {

        this.httpServer.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });

        this.app.get('/', (req, res) => {
            res.send("Servidor REST corriendo...")
        });
    }

}