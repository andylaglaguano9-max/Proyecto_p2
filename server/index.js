import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || undefined,
  database: process.env.DB_NAME || 'ecometrics',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// =======================
// RUTAS DE AUTENTICACIÓN
// =======================

// Registro
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Verificar si existe el usuario
    const [existingUsers] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
    }
    
    // Hashear la contraseña (cifrado por seguridad)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Insertar usuario
    const [result] = await pool.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );
    
    res.status(201).json({ id: result.insertId, username });
  } catch (error) {
    console.error('Error registrando usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (users.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    // Validar contraseña cifrada
    const isMatch = await bcrypt.compare(password, users[0].password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    // Devolvemos los datos básicos del usuario
    res.json({ id: users[0].id, username: users[0].username });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// =======================
// RUTAS DE CÁLCULOS
// =======================

// GET /api/calculos - Obtener el historial (ahora por usuario)
app.get('/api/calculos', async (req, res) => {
  const userId = req.query.user_id;
  try {
    let rows;
    if (userId) {
      [rows] = await pool.query('SELECT * FROM calculations WHERE user_id = ? ORDER BY date DESC', [userId]);
    } else {
      [rows] = await pool.query('SELECT * FROM calculations ORDER BY date DESC');
    }
    res.json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error al obtener el historial de cálculos' });
  }
});

// POST /api/calculos - Guardar un nuevo cálculo asignado a un usuario
app.post('/api/calculos', async (req, res) => {
  const { user_id, kwh, gallons, gas = 0, waste = 0, flights = 0, total_emissions, trees_needed, date } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO calculations (user_id, kwh, gallons, gas, waste, flights, total_emissions, trees_needed, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [user_id || null, kwh, gallons, gas, waste, flights, total_emissions, trees_needed, date]
    );
    
    const [newRow] = await pool.query('SELECT * FROM calculations WHERE id = ?', [result.insertId]);
    res.status(201).json(newRow[0]);
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Error al guardar el cálculo en la base de datos' });
  }
});

app.listen(port, () => {
  console.log(`Backend de EcoMetrics ejecutándose en http://localhost:${port}`);
});
