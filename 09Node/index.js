var http = require('http');

//Vamos a crear nuestro propio servidor
var servidor = http.createServer(function (req, res) {
    //Req -> request es una solicitud, viene por parte de la arquitectura cliente-servidor, todos los clientes (navegadores, usuarios, app, servicios, etc), son los que realizan una petición por parte del protocolo
    //Res -> responese es la respuesta que el servidor le da al cliente
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8'});
    res.write("<h1>Hola mundo desde Node.js</h1>");
    res.write("<h1>A dormir</h1>");
    console.log("Hola, si entró al servidor");
    res.end();
});

//Es necesario tener un puerto de comunicación para el servidor
servidor.listen(3000);
console.log("Servidor ejecutándose en http://localhost:3000");