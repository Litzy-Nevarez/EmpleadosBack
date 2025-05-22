const express = require('express');
const router = express.Router();

const {
    getEmpleados,
    createEmpleado,
    deleteEmpleado,
    updateEmpleado
} = require('../controllers/empleadosController');

router.get('/empleados', getEmpleados);
router.post('/empleados', createEmpleado);
router.delete('/empleados/:id', deleteEmpleado);
router.put('/empleados/:id', updateEmpleado);

module.exports = router;
