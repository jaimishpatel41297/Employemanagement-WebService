var mongoose = require('mongoose');
var LeaveRequestSchema = new mongoose.Schema({
    EmployeesID: String,
    LeaveReason: String,
    LeaveStatus: { type: Boolean, default: false },
    LeaveStartDate: { type: Date, default: Date.now },
    LeaveEndDate: { type: Date, default: Date.now },
});
mongoose.model('LeaveRequest', LeaveRequestSchema);

module.exports = mongoose.model('LeaveRequest');