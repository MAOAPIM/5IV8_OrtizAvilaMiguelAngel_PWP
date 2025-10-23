
var http = require('http');

// Vamos a crear nuestro propio servidor
var servidor = http.createServer(function(req, res) {
  // req -> request es una solicitud (del cliente)
  // res -> response es la respuesta (del servidor)

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

  res.write('<h1>Hola mundo desde Node.js</h1>');
  res.write('<h1>A mimir</h1>');
  res.write('<h1>A mimirerwefweraweawre</h1>');
  console.log("Hola, sí entró al servidor");

  res.end();
});

// Escuchar en un puerto (por ejemplo, 3000)
servidor.listen(3000, function() {
  console.log("Servidor escuchando en http://localhost:3000");
});


//Es necesario terner un puerto de cominucacion para el servidor

