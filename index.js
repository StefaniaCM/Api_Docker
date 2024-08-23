const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const crypto = require('crypto');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const session = require('express-session');

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
});
app.use(limiter);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});


app.post('/crear-ser-interdimensional', (req, res) => {
  const { nombre_usuario, don, planeta_origen, contrasena, email_etereo } = req.body;
  const hashedPassword = crypto.createHash('sha256').update(contrasena).digest('hex');
  const sql = 'INSERT INTO seres_interdimensionales (nombre_usuario, don, planeta_origen, contrasena, email_etereo) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [nombre_usuario, don, planeta_origen, hashedPassword, email_etereo], (err, result) => {
    if (err) throw err;
    res.status(201).send('Ser interdimensional creado');
  });
});


app.get('/consultar-seres-interdimensional', (req, res) => {
  const sql = 'SELECT * FROM seres_interdimensionales';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});


app.get('/consultar-ser-interdimensional-by-id/:id', (req, res) => {
  const sql = 'SELECT * FROM seres_interdimensionales WHERE id_usuario = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});


app.put('/actualizar-ser-interdimensional', (req, res) => {
  const { nombre_usuario, don, planeta_origen, contrasena, email_etereo } = req.body;
  const hashedPassword = crypto.createHash('sha256').update(contrasena).digest('hex');
  const sql = 'UPDATE seres_interdimensionales SET nombre_usuario = ?, don = ?, planeta_origen = ?, contrasena = ?, email_etereo = ? WHERE id_usuario = ?';
  db.query(sql, [nombre_usuario, don, planeta_origen, hashedPassword, email_etereo, req.params.id], (err, result) => {
    if (err) throw err;
    res.send('Ser interdimensional actualizado');
  });
});


app.delete('/eliminar-ser-interdimensional', (req, res) => {
  const sql = 'DELETE FROM seres_interdimensionales WHERE id_usuario = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send('Ser interdimensional eliminado');
  });
});
