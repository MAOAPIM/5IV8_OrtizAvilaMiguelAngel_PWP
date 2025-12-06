import mysql from 'mysql2';
import dotenv from 'dotenv';

//si vamos a tener una bd en servidor
//import {fileURLToPath} from 'url';

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

//dotenv.config({ path: path.resolve(__dirname, '../.env') });

dotenv.config();

const config = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'curso'

    //esto es para el servidor de la bd
    //conecctionLimit: 10
    //acquireTimeout: 30000,
    //iddleTimeout: 30000
});

config.getConnection((err, connection) => {
    if (err) {
        console.error('Error de conexion a la base de datos: ', err);
        return;
    }
    console.log('Conexión a la base de datos establecida correctamente.');
    connection.release();//refresca la conexion
});

export default config;