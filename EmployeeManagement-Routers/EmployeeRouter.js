var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var VerifyToken = require('../VerifyToken');
const Employee = require("../Models/EmployeeModel");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var controller = require("../EmployeeManagement-Controllers/EmployeeController")


router.get('/me', VerifyToken, function (req, res, next) {

    Employee.findById(req.id, { password: 0 }, function (err, employee) {
        if (err) return res.status(500).send("There was a problem finding the employee.");
        if (!employee) return res.status(404).send("No employee found.");
        res.status(200).send(employee);
    });

});

router.get('/', controller.getAllemployee);
router.get('/:id', controller.getSingleEmployee);
router.post('/registerEmployee', controller.employeeRegistration);
router.post('/login', controller.employeeLogin);
router.get('/logout', function (req, res) {
    res.status(200).send({ auth: true, token: null });
});

router.put(`/updateEmployee/:id`, controller.updateEmployee);
router.delete("/deleteEmployee/:id", controller.deleteEmployee);
router.delete("/deleteAllEmployees", controller.deleteAllEmployees);
router.post('/changeEmployeePassword', controller.employeeChangePassword);


module.exports = router;
