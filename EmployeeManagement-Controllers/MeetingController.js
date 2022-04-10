const { response } = require("express");
const Meeting = require("../Models/MeetingModel");
const Employee = require("../Models/EmployeeModel");


exports.getAllMeetingData = async function (req, res) {
    await Meeting.find({}, function (err, meeting) {
        if (err) return res.status(500).send({ response: false });
        res.status(200).send(meeting);
    });
}

exports.getAllMeetingDatabyMeetingID = async function (req, res) {
    await Meeting.findById(req.params.meetingId, function (err, meeting) {
        if (err) return res.status(500).send({ auth: false });
        res.status(200).send(meeting);
    });
}

exports.getAllMeetingDetailByEmployeeID = async function (req, res) {
    await Meeting.find({ EmployeesID: req.params.employeeId }, function (err, meeting) {
        if (err) return res.status(500).send({ response: false });
        if (!meeting) return res.status(404).send({ response: false });
        res.status(200).send(meeting);
    })
}
exports.getAllMeetingDetailByOwner = async function (req, res) {
    await Meeting.find({ MeetingCreatedBy: req.params.createdById }, function (err, meeting) {
        if (err) return res.status(500).send({ response: false });
        if (!meeting) return res.status(404).send({ response: false });
        res.status(200).send(meeting);
    })
}
exports.getAllMeetingDetailByDate = async function (req, res) {
    await Meeting.find({ MeetingDate: req.params.meetindDate }, function (err, meeting) {
        if (err) return res.status(500).send({ response: false });
        if (!meeting) return res.status(404).send({ response: false });
        res.status(200).send(meeting);
    })
}
exports.getAllMeetingDetailByTime = async function (req, res) {
    await Meeting.find({ MeetingTime: req.params.meetingTime }, function (err, meeting) {
        if (err) return res.status(500).send({ response: false });
        if (!meeting) return res.status(404).send({ response: false });
        res.status(200).send(meeting);
    })
}

exports.addMeetingData = async function (req, res) {
    await Meeting.create({
        MeetingCreatedBy: req.body.MeetingCreatedBy,
        EmployeesID: req.body.EmployeesID,
        MeetingDate: req.body.MeetingDate,
        MeetingTime: req.body.MeetingTime
    },
        function (err, meeting) {
            if (err) return res.status(500).send(err);
            res.status(200).send(meeting);
        });
}

exports.updateMeetingData = async function (req, res) {
    try {
        Meeting.findByIdAndUpdate(req.params.meetingId, req.body, { new: true }, function (err, meeting) {
            if (err) return res.status(500).send({ response: false });
            res.status(200).send(meeting);
        })
    } catch (err) {
        res.status(500).send({ response: false });
    }
}


exports.deleteMeetingData = async function (req, res) {
    try {
        Meeting.findByIdAndRemove(req.params.meetingId, function (err, meeting) {
            if (err) return res.status(500).send({ response: false });
            res.status(200).send({ response: true });
        });
    } catch (err) {
        res.status(500).send({ response: false })
    }
}
