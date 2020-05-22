

import { Router, Request, Response } from 'express';
import Server from '../class/server';
import { usuariosConectados } from '../sockets/sockets';

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {

    res.json({
        ok: true,
        message: 'GET - Todo esta bien'
    });

});

router.post('/mensajes', (req: Request, res: Response) => {

    const body = req.body.body;
    const from = req.body.from;

    const payload = {
        body,
        from
    }

    const server = Server.instance;
    server.io.emit('new-message', payload);


    res.json({
        ok: true,
        message: 'POST - Todo esta bien',
        body,
        from
    });

});

router.post('/mensajes/:id', (req: Request, res: Response) => {

    const body    = req.body.body;
    const from        = req.body.from;
    const id        = req.params.id;

    const payload = {
        from,
        body
    }

    const server = Server.instance;

    server.io.in(id).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        body,
        from,
        id
    });

});

// =========================================
//      Servicio para obtener todos los IDS de los usuarios
// =========================================
router.get('/usuarios', (req: Request, res: Response) => {

    const server = Server.instance;
    
    server.io.clients( (err: any, clients: string[]) => {

        if(err) {
            return res.json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            clients
        });
    });

});


// =========================================
//      Obtener usuarios y sus nombres
// =========================================
router.get('/usuarios/detalle', (req: Request, res: Response) => {

    res.json({
        ok: true,
        clients: usuariosConectados.getUsuarios()
    });

});


export default router;