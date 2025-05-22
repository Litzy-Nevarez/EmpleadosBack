const db = require('../db');

const login = (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
    if (err) {
        console.error('Error al consultar la base:', err);
        return res.status(500).json({ message: 'Error en el servidor' });
    }

    if (results.length > 0) {
        return res.status(200).json({ message: 'Login exitoso', user: results[0] });
    } else {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    });
};

module.exports = { login };
