const { response } = require("express");
const EmployeeAttendance = require("../Models/EmployeeAttendanceModel");
const Employee = require("../Models/EmployeeModel");

exports.getAllEmployeeAttendanceData = async function (req, res) {
    await EmployeeAttendance.find({}, function (err, employyeAttendance) {
        if (err) return res.status(500).send({ response: false });
        res.status(200).send(employyeAttendance);
    });
}


exports.getAttendanceDataBtAttendanceID = async function (req, res) {
    await EmployeeAttendance.findById(req.params.attendanceId, function (err, employyeAttendance) {
        if (err) return res.status(500).send({ auth: false });
        res.status(200).send(employyeAttendance);
    });
}

exports.getAllEmployeeAttendanceDataByEmployee = async function (req, res) {
    await EmployeeAttendance.find({ EmployeesID: req.params.employeeId }, function (err, employyeAttendance) {
        if (err) return res.status(500).send({ response: false });
        if (!employyeAttendance) return res.status(404).send({ response: false });
        res.status(200).send(employyeAttendance);
    })
}

exports.getAllEmployeeAttendanceDataByDate = async function (req, res) {
    await EmployeeAttendance.find({ AttendanceDate: req.params.date }, function (err, employyeAttendance) {
        if (err) return res.status(500).send({ response: false });
        if (!employyeAttendance) return res.status(404).send({ response: false });
        res.status(200).send(employyeAttendance);
    })
}

exports.getAllEmployeeAttendanceDataByLocation = async function (req, res) {
    await EmployeeAttendance.find({ AttendanceLocation: req.params.location }, function (err, employyeAttendance) {
        if (err) return res.status(500).send({ response: false });
        if (!employyeAttendance) return res.status(404).send({ response: false });
        res.status(200).send(employyeAttendance);
    })
}

exports.addEmployeeAttemdanceData = async function (req, res) {

    const Employeeid = await Employee.findOne({ EmployeeName: req.params.employeeID });

    if (Employeeid !== null) {
        await EmployeeAttendance.create({
            EmployeesID: Employeeid.EmployeeName,
            PunchInTime: req.body.PunchInTime,
            PunchOutTime: req.body.PunchOutTime,
            AttendanceDate: req.body.AttendanceDate,
            AttendanceLocation: req.body.AttendanceLocation
        },
            function (err, employyeAttendance) {
                if (err) return res.status(500).send({ response: false });
                res.status(200).send(employyeAttendance);
            });
    } else {
        return res.status(500).send({ response: false });
    }
}

exports.updateEmployeeAttemdanceData = async function (req, res) {
    try {
        EmployeeAttendance.findByIdAndUpdate(req.params.attendanceId, req.body, { new: true }, function (err, employyeAttendance) {
            if (err) return res.status(500).send({ response: false });
            res.status(200).send(employyeAttendance);
        })
    } catch (err) {
        res.status(500).send({ response: false });
    }
}

