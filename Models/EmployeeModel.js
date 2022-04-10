var mongoose = require('mongoose');
var EmployeeSchema = new mongoose.Schema({
    EmployeeName: String,
    EmployeeEmail: String,
    EmployeePassword: String,
});
mongoose.model('Employee', EmployeeSchema);

module.exports = mongoose.model('Employee');