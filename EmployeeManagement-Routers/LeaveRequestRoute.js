var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var controller = require("../EmployeeManagement-Controllers/LeaveRequestController")


router.get('/', controller.getAllLeaveRequestData);
router.get('/:id', controller.getAllLeaveRequestDataByID);
router.get('/leaveByEmployee/:employeeId', controller.getAllLeaveRequestDataByEMployeeID);
router.get('/leaveByStatus/:status', controller.getAllLeaveRequestDataByLeaveStatus);

router.post('/:employeeID', controller.addLeaveRequestData);

router.put('/:leaveRequestId', controller.updateLeaveRequestData);

router.delete("/:leaveRequestId", controller.deleteLeaveRequestByID);


module.exports = router;