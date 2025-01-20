const mssql = require('mssql');

// Configuración de la conexión a SQL Server
const config = {
    user: 'sa',        //  usuario
    password: 'cris123',  //  contraseña
    server: 'localhost',  // Dirección del servidor
    database: 'Peliculas_GonzalezCen_5A',  // Nombre de la base de datos
    options: {
        encrypt: true,  // Usar para conexiones seguras
        trustServerCertificate: true,  // Habilitar conexiones sin certificados SSL
    },
};

// Conexión a la base de datos
const connectToDatabase = async () => {
    try {
        await mssql.connect(config);
        console.log('Conectado a la base de datos');
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
    }
};

// Exportar la función para que sea utilizada en otros archivos
module.exports = { connectToDatabase, mssql };
