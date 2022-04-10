const { response } = require("express");
const LeaveRequest = require("../Models/LeaveRequestModel");
const Employee = require("../Models/EmployeeModel");

exports.getAllLeaveRequestData = async function (req, res) {
    await LeaveRequest.find({}, function (err, leaverequestData) {
        if (err) return res.status(500).send({ response: false });
        res.status(200).send(leaverequestData);
    });
}

exports.getAllLeaveRequestDataByID = async function (req, res) {
    await LeaveRequest.findById(req.params.id, function (err, leaverequestData) {
        if (err) return res.status(500).send({ auth: false });
        res.status(200).send(leaverequestData);
    });
}

exports.getAllLeaveRequestDataByEMployeeID = async function (req, res) {
    await LeaveRequest.find({ EmployeesID: req.params.employeeId }, function (err, leaverequestData) {
        if (err) return res.status(500).send({ response: false });
        if (!leaverequestData) return res.status(404).send({ response: false });
        res.status(200).send(leaverequestData);
    })
}

exports.getAllLeaveRequestDataByLeaveStatus = async function (req, res) {
    await LeaveRequest.find({ LeaveStatus: req.params.status }, function (err, leaverequestData) {
        if (err) return res.status(500).send({ response: false });
        if (!leaverequestData) return res.status(404).send({ response: false });
        res.status(200).send(leaverequestData);
    })
}

exports.addLeaveRequestData = async function (req, res) {

    const Employeeid = await Employee.findOne({ EmployeeName: req.params.employeeID });

    if (Employeeid !== null) {
        await LeaveRequest.create({
            EmployeesID: Employeeid.EmployeeName,
            LeaveReason: req.body.PunchInTime,
            LeaveStatus: req.body.PunchOutTime,
            LeaveStartDate: req.body.AttendanceDate,
            LeaveEndDate: req.body.AttendanceLocation
        },
            function (err, leaverequestData) {
                if (err) return res.status(500).send({ response: false });
                res.status(200).send(leaverequestData);
            });
    } else {
        return res.status(500).send({ response: false });
    }
}

exports.updateLeaveRequestData = async function (req, res) {
    try {
        LeaveRequest.findByIdAndUpdate(req.params.leaveRequestId, req.body, { new: true }, function (err, leaverequestData) {
            if (err) return res.status(500).send({ response: false });
            res.status(200).send(leaverequestData);
        })
    } catch (err) {
        res.status(500).send({ response: false });
    }
}

exports.deleteLeaveRequestByID = async function (req, res) {
    try {
        LeaveRequest.findByIdAndRemove(req.params.leaveRequestId, function (err, leaverequestData) {
            if (err) return res.status(500).send({ response: false });
            res.status(200).send({ response: true });
        });
    } catch (err) {
        res.status(500).send("Error is " + err + "")
    }
}
