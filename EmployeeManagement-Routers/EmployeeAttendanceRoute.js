var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var controller = require("../EmployeeManagement-Controllers/EmployeeAttendanceController")

router.get('/', controller.getAllEmployeeAttendanceData);
router.get('/attendacedataByattendanceID/:attendanceId', controller.getAttendanceDataBtAttendanceID);
router.get('/attendacedataByEmployee/:employeeId', controller.getAllEmployeeAttendanceDataByEmployee);
router.get('/attendacedataByDate/:date', controller.getAllEmployeeAttendanceDataByDate);
router.get('/attendacedataByLocation/:location', controller.getAllEmployeeAttendanceDataByLocation);

router.post('/:employeeID', controller.addEmployeeAttemdanceData);

router.put('/:attendanceId', controller.updateEmployeeAttemdanceData);


module.exports = router;