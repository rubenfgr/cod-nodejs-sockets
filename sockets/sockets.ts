import { Socket } from "socket.io";
import socketIO from "socket.io";

export const disconnect = (client: Socket) => {

    client.on('disconnect', () => {
        console.log('Client desconectado');
    })

}

// Escuchar mensajes
export const message = (client: Socket, io: socketIO.Server) => {

    client.on('message', (payload: {from: string, body: string}, callback) => {

        console.log('Mensaje recibido', payload);

        io.emit('new-message', payload);

    });

}