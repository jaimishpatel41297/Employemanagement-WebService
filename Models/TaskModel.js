var mongoose = require('mongoose');
var TaskSchema = new mongoose.Schema({
    projectid: String,
    TaskName: String,
    TaskStatus: String,
    Priority: String,
    TaskEmployeeAssignees: [{ type: String }],
    TaskCretedDate: { type: Date, default: Date.now },
    TaskDueDate: Date
});
mongoose.model('Task', TaskSchema);

module.exports = mongoose.model('Task');