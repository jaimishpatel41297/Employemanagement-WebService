var mongoose = require('mongoose');
var MeetingSchema = new mongoose.Schema({
    MeetingCreatedBy: String,
    EmployeesID: [{ type: String }],
    MeetingDate: { type: Date, default: Date.now },
    MeetingTime: { type: Number, default: (new Date()).getTime },
});
mongoose.model('Meeting', MeetingSchema);

module.exports = mongoose.model('Meeting');