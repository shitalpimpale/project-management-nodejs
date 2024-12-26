const express = require('express');
const { createTask, deleteTask, updateTask, getTask } = require('../controllers/taskController');

const router = express.Router();

router.post('/createTask', createTask);
router.put('/updateTask', updateTask);
router.delete('/deleteTask/:id', deleteTask);
router.get('/getTask', getTask);

module.exports = router;
