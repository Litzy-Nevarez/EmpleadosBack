const { format } = require('mysql2');
const db = require('../db');
const nodemailer = require('nodemailer');

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

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if(!email) return res.status(400).json({message: 'El email es requerido'});

    try{
        //Configurar el transporter con nodemailer
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: 'yulissa.litzy@gmail.com', // tu correo real
                pass: 'ljef ubli hrzt jddm'
            }
        });

        // Preparar el correo
        let mailOptions = {
            from: 'yulissa.litzy@gmail.com',
            to: email,
            subject: 'Recuperación de contraseña',
            html: `
            <h2>Recupera tu contraseña</h2>
            <p>Haz clic en el enlace para restablecer tu contraseña:</p>
            <a href="http://localhost:5173/reset-password?email=${encodeURIComponent(email)}">Restablecer contraseña</a>
            `
        };

        // Envía el correo
        await transporter.sendMail(mailOptions);

        res.json({ message: 'Correo de recuperación enviado' });

    }catch(error){
        console.error('Error enviando corre:', error);
        res.status(500).json({message: 'Error al enviar correo'});
    }
}

const resetPassword = (req, res) => {
    const { email, newPassword } = req.body

    if (!email || !newPassword) {
        return res.status(400).json({ message: 'Faltan datos' })
    }

    const query = 'UPDATE usuarios SET password = ? WHERE email = ?'
    db.query(query, [newPassword, email], (err, result) => {
        if (err) {
            console.error('Error DB:', err)
            return res.status(500).json({ message: 'Error en el servidor' })
        }

        res.json({ message: 'Contraseña actualizada correctamente' })
    })
}

module.exports = { login, forgotPassword, resetPassword };
