const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar CORS
app.use(cors({
    origin: 'http://localhost:5173'  
}));

// Middleware para parsear JSON
app.use(express.json());


// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Servidor backend funcionando!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
