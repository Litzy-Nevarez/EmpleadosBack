const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const empleadoRoutes = require('./routes/empleados');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Rutas
app.use('/', authRoutes);
app.use('/api', empleadoRoutes);

// Inicio
app.get('/', (req, res) => {
  res.send('¡Servidor funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
