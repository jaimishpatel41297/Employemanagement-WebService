var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var VerifyToken = require('../VerifyToken');
const Admin = require("../Models/AdminModel");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var controller = require("../EmployeeManagement-Controllers/AdminController")

router.post('/login', controller.adminLogin);
router.post('/registerAdmin', controller.adminRegistration);
router.get('/logout', function (req, res) {
    res.status(200).send({ auth: true, token: null });
});

router.get('/me', VerifyToken, function (req, res, next) {
    Admin.findById(req.id, { password: 0 }, function (err, admin) {
        if (err) return res.status(500).send("There was a problem finding the admin.");
        if (!admin) return res.status(404).send("No admin found.");
        res.status(200).send(admin);
    });

});


module.exports = router;