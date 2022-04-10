var mongoose = require('mongoose');
var AttendanceSchema = new mongoose.Schema({
    EmployeesID: String,
    PunchInTime: { type: Number, default: (new Date()).getTime() },
    PunchOutTime: { type: Number, default: (new Date()).getTime() },
    AttendanceDate: { type: Date, default: Date.now },
    AttendanceLocation: String,
});
mongoose.model('EmployeeAttendance', AttendanceSchema);

module.exports = mongoose.model('EmployeeAttendance');