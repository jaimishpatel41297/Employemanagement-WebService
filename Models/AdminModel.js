var mongoose = require('mongoose');
var AdminSchema = new mongoose.Schema({
    AdminName: String,
    AdminEmail: String,
    AdminPassword: String,
});
mongoose.model('Admin', AdminSchema);

module.exports = mongoose.model('Admin');