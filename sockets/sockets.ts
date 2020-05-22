import { Socket } from "socket.io";
import socketIO from "socket.io";
import { UsuariosLista } from "../class/usuarios-lista";
import { Usuario } from "../class/usuario";
import { stringify } from "querystring";

export const usuariosConectados = new UsuariosLista();

export const conectarClient = (client: Socket, io: socketIO.Server) => {

    const usuario = new Usuario(client.id);
    usuariosConectados.agregar(usuario);
    io.emit('usuarios-activos', usuariosConectados.getUsuarios());
}

export const disconnect = (client: Socket, io: socketIO.Server) => {

    client.on('disconnect', () => {
        console.log('Client desconectado');
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

        io.emit('usuarios-activos', usuariosConectados.getUsuarios());

        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} configurado`
        });
    });

}

// Obtener usuarios
export const obtenerUsuarios = (client: Socket, io: socketIO.Server) => {

    client.on('obtener-usuarios', () => {

        io.to(client.id).emit('usuarios-activos', usuariosConectados.getUsuarios());
        console.log("obtenerUsuarios()");
        console.log(usuariosConectados.getUsuarios());

    });

}