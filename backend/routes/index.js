const express = require('express');
const auth = require('../middleware/auth');
const authCtrl = require('../controllers/authController');
const projectCtrl = require('../controllers/projectController');
const taskCtrl = require('../controllers/taskController');

const router = express.Router();

// Auth
router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);

// Projects
router.post('/projects', auth, projectCtrl.createProject);
router.get('/projects', auth, projectCtrl.getProjects );

// Tasks
router.post('/projects/:projectId/tasks', auth, taskCtrl.createTask);
router.get('/projects/:projectId/tasks', auth, taskCtrl.getTasks);
router.put('/tasks/:taskId', auth, taskCtrl.updateTask);
router.delete('/tasks/:taskId', auth, taskCtrl.deleteTask);

module.exports = router;
