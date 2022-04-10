var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var controller = require("../EmployeeManagement-Controllers/ProjectController")

router.get('/', controller.getAllProject);
router.get('/projectId/:id', controller.getSingleProject);
router.get('/employeeId/:ProjectEmployeeAssignees', controller.getProjectByEmployee);
router.get('/:data', controller.getProjectByEmployeeOrDueDate);

router.post('/', controller.addProject);

//router.put('/', controller.updateProject);
router.put('/:id', controller.updateProjectById);

//router.delete('/', controller.deleteProject);
router.delete('/:projectId', controller.deleteProject);

module.exports = router;