const express = require('express');
const { createProject, getProjects, deleteProject, updateProject } = require('../controllers/projectController');

const router = express.Router();

router.post('/createProject', createProject);
router.put('/updateProject', updateProject);
router.get('/getProjects', getProjects);
router.delete('/deleteProject/:id', deleteProject);

module.exports = router;
