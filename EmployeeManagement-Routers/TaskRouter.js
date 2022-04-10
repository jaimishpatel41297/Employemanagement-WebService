var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var controller = require("../EmployeeManagement-Controllers/TaskController")


router.get('/', controller.getAllTasksData);
router.get('/taskbyProject/:projectId', controller.getAllTaskbyProjectId);
router.get('/taskbyEmployee/:employeeId', controller.getAllTasktDatabyEmployeeId);
router.get('/taskbyDuedate/:dueDate', controller.getAllTaskByDueDate);
router.get('/taskbyStatus/:status', controller.getAllTasktByStaus);
router.get('/taskbyPriority/:priority', controller.getAllTasktbyPriority);

router.post('/:projectId', controller.addTaskData);

router.put('/:taskId', controller.updateTaskData);

router.delete('/:taskId', controller.deleteTaskData);


module.exports = router;