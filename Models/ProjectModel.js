var mongoose = require('mongoose');
var ProjectSchema = new mongoose.Schema({
    ProjectName: String,
    ProjectEmployeeAssignees: [{ type: String }],
    ProjectDueDate: { type: Date, default: Date.now }
});
mongoose.model('Project', ProjectSchema);

module.exports = mongoose.model('Project');