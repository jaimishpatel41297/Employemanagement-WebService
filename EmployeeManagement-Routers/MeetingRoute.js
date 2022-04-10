var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var controller = require("../EmployeeManagement-Controllers/MeetingController")

router.get('/', controller.getAllMeetingData);
router.get('/meetingId/:meetingId', controller.getAllMeetingDatabyMeetingID);
router.get('/:employeeId', controller.getAllMeetingDetailByEmployeeID)
router.get('/createdBy/:createdById', controller.getAllMeetingDetailByOwner)
router.get('/meetingDate/:meetindDate', controller.getAllMeetingDetailByDate)
router.get('/mettingTime/:meetingTime', controller.getAllMeetingDetailByTime)

router.post('/', controller.addMeetingData);

router.put('/:meetingId', controller.updateMeetingData);

router.delete('/:meetingId', controller.deleteMeetingData);


module.exports = router;