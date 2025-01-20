Create Database Peliculas_GonzalezCen_5A
Use Peliculas_GonzalezCen_5A

CREATE TABLE Peliculas (
    Id INT IDENTITY(1,1) PRIMARY KEY,  
    Titulo VARCHAR(255) NOT NULL,
    Director VARCHAR(255),
    Genero VARCHAR(100),
    Puntuacion FLOAT,
    Rating VARCHAR(50),
    Ano_Publicacion INT
);

Select * from Peliculas

INSERT INTO Peliculas (Titulo, Director, Genero, Puntuacion, Rating, Ano_Publicacion)
VALUES 
('Inception', 'Christopher Nolan', 'Sci-Fi', 8.8, 'PG-13', 2010),
('The Dark Knight', 'Christopher Nolan', 'Action', 9.0, 'PG-13', 2008),
('Interstellar', 'Christopher Nolan', 'Sci-Fi', 8.6, 'PG-13', 2014),
('The Shawshank Redemption', 'Frank Darabont', 'Drama', 9.3, 'R', 1994),
('The Godfather', 'Francis Ford Coppola', 'Crime', 9.2, 'R', 1972),
('Pulp Fiction', 'Quentin Tarantino', 'Crime', 8.9, 'R', 1994),
('The Matrix', 'Lana Wachowski, Lilly Wachowski', 'Sci-Fi', 8.7, 'R', 1999),
('Forrest Gump', 'Robert Zemeckis', 'Drama', 8.8, 'PG-13', 1994),
('The Avengers', 'Joss Whedon', 'Action', 8.0, 'PG-13', 2012),
('Gladiator', 'Ridley Scott', 'Action', 8.5, 'R', 2000);

SELECT name, type_desc
FROM sys.database_principals
WHERE type IN ('S', 'U');

EXEC sp_helpuser;

SELECT name, type_desc, is_disabled
FROM sys.server_principals
WHERE type IN ('S', 'U') AND name NOT LIKE '##%';

ALTER LOGIN sa WITH PASSWORD = 'cris123';
