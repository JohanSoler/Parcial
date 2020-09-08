const express = require('express');
const appServer = express();
appServer.use(express.json()); 

appServer.listen (2992, ()=>{
    console.log('EL SERVIDOR ESTA CORRIENDO EN EL PUERTO 2992');
});

//Datos necesarios

var listaJuegos = [];

//rutas 

appServer.get('/',
    (req,res)=>{
        res.send('Ya estamos en linea');
    }
);

appServer.post('/addVideogame', 
    (req,res)=>{
        let auxGame={};

        auxGame.id = req.body.id;
        auxGame.titulo = req.body.titulo;
        auxGame.año_de_lanzamiento = req.body.año_de_lanzamiento;
        auxGame.estudio = req.body.estudio;
        auxGame.descripcion = req.body.descripcion;
        auxGame.edad_minima = req.body.edad_minima;

        listaJuegos.push(auxGame);
        res.send('SE HA CREADO EL JUEGO: ' + auxGame.titulo);
        console.log('SE AGREGO UN JUEGO')
        console.log(listaJuegos);
    }
);

appServer.delete('/deletegame/:id',
    (req, res)=>{
        let auxId=  req.params.id;

        console.log('ESTA ELIMINANDO EL ID: ', auxId);
        for(var i = 0; i<listaJuegos.length;i++){
            if(listaJuegos[i].id==auxId){
                listaJuegos.splice(i,1);
            }
        }
        res.send('ELIMINADO')
        console.log(listaJuegos);
    }
);

appServer.get('/mostrar',
    (req,res)=>{
        res.json(listaJuegos);
        console.log('LISTA DE JUEGOS');
        console.log(listaJuegos);
    }
);

appServer.get('/mostrarId/:id',
    (req, res)=>{
        let auxId=  req.params.id;
        let auxP;

        for(var i = 0; i<listaJuegos.length;i++){
            if(listaJuegos[i].id==auxId){
                res.json(listaJuegos[i]);
                auxP=i;
            }
        }
        res.send('ENVIADO')
        console.log('JUEGO ENCONTRADO:')
        console.log(listaJuegos[auxP]);
    }
);

appServer.get('/mostrarNombre/:nombre',
    (req, res)=>{
        let auxNombre=req.params.nombre;
        let auxP;
        console.log(req.params.nombre);
        for(var i = 0; i<listaJuegos.length;i++){
            console.log(req.params.nombre);
            if(listaJuegos[i].titulo==auxNombre){
                console.log(req.params.nombre);
                auxP=i;
            }
        }
        res.json(listaJuegos[auxP]);
        console.log('JUEGO ENCONTRADO:');
        console.log(listaJuegos[auxP]);
    }
);

appServer.get('/mostrarRecientes/:fecha',
    (req, res)=>{
        let listaRecientes = [];
        let fecha=req.params.fecha;

        for(var i = 0; i<listaJuegos.length;i++){
            
            console.log('no entro' + fecha);
            if(listaJuegos[i].año_de_lanzamiento>=fecha){
                console.log('entro' + fecha);
                listaRecientes.push(listaJuegos[i]);
            }
        }
        res.json(listaRecientes);
        console.log('JUEGOS ENCONTRADO:')
        console.log(listaRecientes);
    }
);

