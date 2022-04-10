const Employee = require("../Models/EmployeeModel");

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

exports.employeeRegistration = async function (req, res) {
    var hashPassword = bcrypt.hashSync(req.body.EmployeePassword, 8);
    Employee.create({
        EmployeeName: req.body.EmployeeName,
        EmployeeEmail: req.body.EmployeeEmail,
        EmployeePassword: hashPassword,
    },
        function (err, employee) {
            if (err) return res.status(500).send({ auth: false })
            var token = jwt.sign({ id: employee._id }, config.secret, {
                expiresIn: 83400
            });
            res.status(200).send({ auth: true, token: token });
        });
}

exports.employeeChangePassword = async function (req, res) {
    var hashPassword = bcrypt.hashSync(req.body.EmployeePassword, 8);
    Employee.findOne({ EmployeeEmail: req.body.EmployeeEmail }, function (err, employee) {
        if (err) return res.status(500).send({ auth: false });
        if (!employee) return res.status(404).send({ auth: false });

        Employee.findByIdAndUpdate(employee._id, { EmployeeName: employee.EmployeeName, EmployeeEmail: employee.EmployeeEmail, EmployeePassword: hashPassword }, { new: true }, function (err, faq) {
            if (err) return res.status(500).send({ auth: false });
            else return res.status(500).send({ auth: true });
        });
    });
}

exports.getAllemployee = async function (req, res) {
    await Employee.find({}, function (err, employee) {
        if (err) return res.status(500).send({ auth: false });
        res.status(200).send(employee);
    }).catch(function (Err) {
        console.log('That did not go well ' + Err + '')
    });
}


exports.getSingleEmployee = async function (req, res) {
    await Employee.findById(req.params.id, function (err, employee) {
        if (err) return res.status(500).send({ auth: false });
        res.status(200).send(employee);
    });
}

exports.employeeLogin = async function (req, res) {
    Employee.findOne({ EmployeeEmail: req.body.EmployeeEmail }, function (err, employee) {
        if (err) return res.status(500).send({ auth: false });
        if (!employee) return res.status(404).send({ auth: false });

        var passwordIsValid = bcrypt.compareSync(req.body.EmployeePassword, employee.EmployeePassword);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        var token = jwt.sign({ id: employee._id }, config.secret, {
            expiresIn: 86400
        });

        res.status(200).send({ auth: true, token: token, employeeid: employee._id, employeename: employee.EmployeeName });
    });
}

exports.deleteEmployee = async function (req, res) {
    Employee.findByIdAndRemove(req.params.id, function (err, employee) {
        if (err) return res.status(500).send({ auth: false });
        res.status(200).send("employee: " + employee.name + " was deleted.");
    });
}

exports.updateEmployee = async function (req, res) {
    Employee.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, employee) {
        if (err) return res.status(500).send({ auth: false });
        res.status(200).send(employee);
    });
}

exports.deleteAllEmployees = async function (req, res) {
    Employee.remove({}, function (err, employee) {
        if (err) return res.status(500).send({ auth: false });
        res.status(200).send(employee);
    });
}

