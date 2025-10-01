-- Initial database setup for Control de Stock
-- This file will be executed when the PostgreSQL container starts

-- Create database if it doesn't exist
-- (This is handled by docker-compose environment variables)

-- Enable UUID extension if needed
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types if needed
-- CREATE TYPE user_role AS ENUM ('admin', 'user', 'manager');

-- The actual table creation will be handled by TypeORM synchronize: true
-- This file is for any additional setup, indexes, or initial data

-- Example: Create indexes for better performance
-- CREATE INDEX idx_productos_codigo_barras ON productos (codigoDeBarras);
-- CREATE INDEX idx_productos_marca ON productos (idMarca);
-- CREATE INDEX idx_productos_categoria ON productos (idCategoria);

-- Example: Insert initial data
-- INSERT INTO paises (nombre) VALUES ('Argentina') ON CONFLICT (nombre) DO NOTHING;
-- INSERT INTO provincias (nombre, pais) VALUES ('Buenos Aires', 1) ON CONFLICT DO NOTHING;
-- INSERT INTO ciudades (nombre, latitud, longitud, provincia) VALUES ('CABA', -34.6037, -58.3816, 1) ON CONFLICT DO NOTHING;

-- Add any other database initialization here
