const db = require('../db');

// Obtener todos los empleados
const getEmpleados = (req, res) => {
    db.query('SELECT * FROM empleados', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

// Crear nuevo empleado
const createEmpleado = (req, res) => {
    const { nombre, telefono, puesto } = req.body;
    const query = 'INSERT INTO empleados (nombre, telefono, puesto) VALUES (?, ?, ?)';
    db.query(query, [nombre, telefono, puesto], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Empleado creado', id: result.insertId });
    });
};

// Eliminar empleado
const deleteEmpleado = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM empleados WHERE id_empleado = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Empleado eliminado' });
    });
};

// Actualizar empleado
const updateEmpleado = (req, res) => {
    const { id } = req.params;
    const { nombre, telefono, puesto } = req.body;
    const query = 'UPDATE empleados SET nombre = ?, telefono = ?, puesto = ? WHERE id_empleado = ?';
    db.query(query, [nombre, telefono, puesto, id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Empleado actualizado' });
    });
};

module.exports = {
    getEmpleados,
    createEmpleado,
    deleteEmpleado,
    updateEmpleado
};
