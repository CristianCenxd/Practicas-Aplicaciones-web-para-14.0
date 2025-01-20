const express = require('express');
const { mssql, connectToDatabase } = require('./Database/dbConnection');
const path = require('path');
const app = express();
const port = 3000;

// Middleware para permitir que el servidor maneje JSON en las solicitudes
app.use(express.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Conectar a la base de datos
connectToDatabase();

// Ruta para acceder a la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Conectar a la base de datos
connectToDatabase();

// Ruta para obtener todas las películas
app.get('/peliculas', async (req, res) => {
    try {
        const result = await mssql.query('SELECT * FROM Peliculas');
        res.json(result.recordset); // Retorna las películas como JSON
    } catch (err) {
        console.error('Error al obtener películas:', err);
        res.status(500).send('Error al obtener películas');
    }
});

// Ruta para obtener una película por ID
app.get('/peliculas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await mssql.query`SELECT * FROM Peliculas WHERE Id = ${id}`;
        if (result.recordset.length === 0) {
            return res.status(404).send('Película no encontrada');
        }
        res.json(result.recordset[0]); // Retorna la película solicitada
    } catch (err) {
        console.error('Error al obtener la película:', err);
        res.status(500).send('Error al obtener la película');
    }
});

// Ruta para insertar una nueva película
app.post('/peliculas', async (req, res) => {
    const { Titulo, Director, Genero, Puntuacion, Rating, Ano_Publicacion } = req.body;
    try {
        const result = await mssql.query`INSERT INTO Peliculas (Titulo, Director, Genero, Puntuacion, Rating, Ano_Publicacion)
                                        VALUES (${Titulo}, ${Director}, ${Genero}, ${Puntuacion}, ${Rating}, ${Ano_Publicacion})`;
        res.status(201).send('Película agregada exitosamente');
    } catch (err) {
        console.error('Error al agregar la película:', err);
        res.status(500).send('Error al agregar la película');
    }
});

// Ruta para eliminar una película por ID
app.delete('/peliculas/:id', async (req, res) => {
    const { id } = req.params;  // Obtener el ID de la URL
    try {
        // Ejecutar la consulta DELETE
        const result = await mssql.query`DELETE FROM Peliculas WHERE Id = ${id}`;

        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Película no encontrada');
        }

        res.status(200).send('Película eliminada exitosamente');
    } catch (err) {
        console.error('Error al eliminar la película:', err);
        res.status(500).send('Error al eliminar la película');
    }
});
// Ruta para actualizar una película
app.put('/peliculas/:id', async (req, res) => {
    const { id } = req.params;
    const { Titulo, Director, Genero, Puntuacion, Rating, Ano_Publicacion } = req.body;
    try {
        const result = await mssql.query`
            UPDATE Peliculas
            SET Titulo = ${Titulo}, Director = ${Director}, Genero = ${Genero}, 
                Puntuacion = ${Puntuacion}, Rating = ${Rating}, Ano_Publicacion = ${Ano_Publicacion}
            WHERE Id = ${id}
        `;
        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Película no encontrada');
        }
        res.status(200).send('Película actualizada exitosamente');
    } catch (err) {
        console.error('Error al actualizar la película:', err);
        res.status(500).send('Error al actualizar la película');
    }
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
