-- Ejecuta esto en el Query Tool de tu pgAdmin 4

-- 1. Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Crear tabla de cálculos (ahora con user_id para enlazar cada cálculo a un usuario)
CREATE TABLE IF NOT EXISTS calculations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    kwh NUMERIC NOT NULL,
    gallons NUMERIC NOT NULL,
    gas NUMERIC DEFAULT 0,
    waste NUMERIC DEFAULT 0,
    flights NUMERIC DEFAULT 0,
    total_emissions NUMERIC NOT NULL,
    trees_needed INTEGER NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
