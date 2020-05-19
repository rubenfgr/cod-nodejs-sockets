

import express from 'express';
import { SERVER_PORT } from '../global/environment';

export default class Server {

    public app: express.Application
    public port: number;

    constructor() {
        this.app = express();
        this.port = SERVER_PORT;
    }

    // =========================================
    //      Mostrar página para desarrollo
    // =========================================

    start() {

        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });

        this.app.get('/', (req, res) => {
            res.send("Servidor REST corriendo...")
        });
    }

}