const express = require('express');
const { createTaskTag, deleteTaskTag, updateTaskTag } = require('../controllers/taskTagController');

const router = express.Router();

// router.post('/createTaskTag', createTaskTag);
// router.put('/updateTaskTag', updateTaskTag);
// router.delete('/deleteTaskTag/:id', deleteTaskTag);

module.exports = router;
