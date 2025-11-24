const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');

require('dotenv').config({ path: './.env' });

const app = express();
const port = 3000;

// Configuración de MySQL
const bd = mysql.createConnection({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_NAME
});

bd.connect((error) => {
    if (error) {
        console.log('Error de conexión: ' + error);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// CSS
app.use(express.static(path.join(__dirname, 'public')));
//----------------------------------------------------------------------------------------------------------//

// RUTA GET 
app.get('/', (req, res) => {
    const query = 'SELECT * FROM estudiantes';

    bd.query(query, (error, resultados) => {
        if (error) {
            console.log('Error al obtener los estudiantes: ' + error);
            return res.status(500).send('Error al obtener los estudiantes');
        }
        res.render('index', { estudiantes: resultados });
    });
});


app.post('/estudiantes', (req, res) => {
    const { nombre, edad, curso } = req.body;

    console.log(nombre, edad, curso);

    const query = 'INSERT INTO estudiantes (nombre, edad, curso) VALUES (?, ?, ?)';

    bd.query(query, [nombre, edad, curso], (error, resultados) => {
        if (error) {
            console.log('Error al crear estudiante: ' + error);
            return res.status(500).send('Error al crear el estudiante');
        }
        res.redirect('/');
    });
});

app.get('/estudiantes/delete/:id', (req, res) => {
    const estudianteId = req.params.id;
    const query = 'DELETE FROM estudiantes WHERE id = ?';
    bd.query(query, [estudianteId], (error, resultados) => {
        if (error) {
            console.log('Error al eliminar estudiante: ' + error);
            return res.status(500).send('Error al eliminar el estudiante');
        }
        res.redirect('/');
    });
});

// Ruta para buscar y actualizar
app.get('/estudiantes/edit/:id', (req, res) => {
    const estudianteId = req.params.id;
    const query = 'SELECT * FROM estudiantes WHERE id = ?';
    bd.query(query, [estudianteId], (error, resultados) => {
        if (error) {
            console.log('Error al buscar estudiante: ' + error);
            return res.status(500).send('Error al buscar el estudiante');
        }
        res.render('edit', { estudiante: resultados[0] });
    });
});

app.post('/estudiantes/update/:id', (req, res) => {
    const estudianteId = req.params.id;
    const { nombre, edad, curso } = req.body;

    const query = 'UPDATE estudiantes SET nombre = ?, edad = ?, curso = ? WHERE id = ?';

    bd.query(query, [nombre, edad, curso, estudianteId], (error, resultados) => {
        if (error) {
            console.log('Error al actualizar estudiante: ' + error);
            return res.status(500).send('Error al actualizar el estudiante');
        }
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});