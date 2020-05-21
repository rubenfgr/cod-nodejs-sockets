import { Socket } from "socket.io";
import socketIO from "socket.io";
import { UsuariosLista } from "../class/usuarios-lista";
import { Usuario } from "../class/usuario";

export const usuariosConectados = new UsuariosLista();

export const conectarClient = (client: Socket) => {

    const usuario = new Usuario(client.id);
    usuariosConectados.agregar(usuario);

}

export const disconnect = (client: Socket) => {

    client.on('disconnect', () => {
        usuariosConectados.borrarUsuario(client.id);
    })

}

// Escuchar mensajes
export const message = (client: Socket, io: socketIO.Server) => {

    client.on('message', (payload: {from: string, body: string}, callback) => {

        console.log('Mensaje recibido', payload);

        io.emit('new-message', payload);

    });

}

// Configurar usuario
export const configurarUsuario = (client: Socket, io: socketIO.Server) => {

    client.on('configurar-usuario', (payload: {nombre: string}, callback: Function) => {

        usuariosConectados.actualizarNombre(client.id, payload.nombre);

        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} configurado`
        });
    });

}