require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Configuración de MySQL
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'bitacora_averias'
});

// Conexion a la BD
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la BD:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});



// Página principal
app.get('/', (req, res) => {
    const query = 'SELECT * FROM registros_bitacora ORDER BY fecha_hora_reporte DESC';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error obteniendo registros:', err);
            res.status(500).send('Error del servidor');
            return;
        }
        res.render('index', { registros: results });
    });
});

// Añadir nuevo registro 
app.post('/agregar', (req, res) => {
    const {
        fecha_hora_reporte,
        id_equipo_afectado,
        sintoma_fallo,
        diagnostico_tecnico,
        accion_correctiva,
        piezas_reemplazadas,
        tiempo_inactividad
    } = req.body;

    const query = `
        INSERT INTO registros_bitacora 
        (fecha_hora_reporte, id_equipo_afectado, sintoma_fallo, diagnostico_tecnico, 
         accion_correctiva, piezas_reemplazadas, tiempo_inactividad)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(query, [
        fecha_hora_reporte,
        id_equipo_afectado,
        sintoma_fallo,
        diagnostico_tecnico,
        accion_correctiva,
        piezas_reemplazadas,
        tiempo_inactividad
    ], (err, result) => {
        if (err) {
            console.error('Error insertando registro:', err);
            res.status(500).send('Error del servidor');
            return;
        }
        res.redirect('/');
    });
});

// Mostrar formulario
app.get('/editar/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM registros_bitacora WHERE id = ?';

    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error obteniendo registro:', err);
            res.status(500).send('Error del servidor');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('Registro no encontrado');
            return;
        }
        const registro = results[0];
        if (registro.fecha_hora_reporte) {
            const fecha = new Date(registro.fecha_hora_reporte);
            registro.fecha_formateada = fecha.toISOString().slice(0, 16);
        }

        res.render('editar', { registro: registro });
    });
});


app.post('/editar/:id', (req, res) => {
    const { id } = req.params;
    const {
        fecha_hora_reporte,
        id_equipo_afectado,
        sintoma_fallo,
        diagnostico_tecnico,
        accion_correctiva,
        piezas_reemplazadas,
        tiempo_inactividad
    } = req.body;

    const query = `
        UPDATE registros_bitacora 
        SET fecha_hora_reporte = ?, id_equipo_afectado = ?, sintoma_fallo = ?, 
            diagnostico_tecnico = ?, accion_correctiva = ?, piezas_reemplazadas = ?, 
            tiempo_inactividad = ?
        WHERE id = ?
    `;

    connection.query(query, [
        fecha_hora_reporte,
        id_equipo_afectado,
        sintoma_fallo,
        diagnostico_tecnico,
        accion_correctiva,
        piezas_reemplazadas,
        tiempo_inactividad,
        id
    ], (err, result) => {
        if (err) {
            console.error('Error actualizando registro:', err);
            res.status(500).send('Error del servidor');
            return;
        }
        res.redirect('/');
    });
});

// Eliminar registro
app.post('/eliminar/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM registros_bitacora WHERE id = ?';

    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error eliminando registro:', err);
            res.status(500).send('Error del servidor');
            return;
        }
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});