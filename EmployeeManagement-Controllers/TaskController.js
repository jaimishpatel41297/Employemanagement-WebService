const { response } = require("express");
const Task = require("../Models/TaskModel");
const Project = require("../Models/ProjectModel");

exports.getAllTasksData = async function (req, res) {
    await Task.find({}, function (err, task) {
        if (err) return res.status(500).send({ response: false });
        res.status(200).send(task);
    });
}

exports.getAllTaskbyProjectId = async function (req, res) {
    await Task.find({ projectid: req.params.projectId }, function (err, task) {
        if (err) return res.status(500).send({ response: false });
        if (!task) return res.status(404).send({ response: false });
        res.status(200).send(task);
    })
}
exports.getAllTasktDatabyEmployeeId = async function (req, res) {
    await Task.find({ TaskEmployeeAssignees: req.params.employeeId }, function (err, task) {
        if (err) return res.status(500).send({ response: false });
        if (!task) return res.status(404).send({ response: false });
        res.status(200).send(task);
    })
}
exports.getAllTaskByDueDate = async function (req, res) {
    await Task.find({ TaskDueDate: req.params.dueDate }, function (err, task) {
        if (err) return res.status(500).send({ response: false });
        if (!task) return res.status(404).send({ response: false });
        res.status(200).send(task);
    })
}
exports.getAllTasktByStaus = async function (req, res) {
    await Task.find({ TaskStatus: req.params.status }, function (err, task) {
        if (err) return res.status(500).send({ response: false });
        if (!task) return res.status(404).send({ response: false });
        res.status(200).send(task);
    })
}
exports.getAllTasktbyPriority = async function (req, res) {
    await Task.find({ Priority: req.params.priority }, function (err, task) {
        if (err) return res.status(500).send({ response: false });
        if (!task) return res.status(404).send({ response: false });
        res.status(200).send(task);
    })
}


exports.addTaskData = async function (req, res) {

    const projectID = await Project.findOne({ _id: req.params.projectId });

    if (projectID !== null) {
        await Task.create({
            projectid: projectID._id,
            TaskName: req.body.TaskName,
            TaskStatus: req.body.TaskStatus,
            Priority: req.body.Priority,
            TaskEmployeeAssignees: req.body.TaskEmployeeAssignees,
            TaskCretedDate: req.body.TaskCretedDate,
            TaskDueDate: req.body.TaskDueDate
        },
            function (err, task) {
                if (err) return res.status(500).send({ response: false });
                res.status(200).send(task);
            });
    } else {
        return res.status(500).send({ response: false });
    }
}

exports.updateTaskData = async function (req, res) {
    try {
        Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true }, function (err, task) {
            if (err) return res.status(500).send({ response: false });
            res.status(200).send(task);
        })
    } catch (err) {
        res.status(500).send({ response: false });
    }
}

exports.deleteTaskData = async function (req, res) {
    try {
        Task.findByIdAndRemove(req.params.taskId, function (err, task) {
            if (err) return res.status(500).send({ response: false });
            res.status(200).send({ response: true });
        });
    } catch (err) {
        res.status(500).send({ response: false })
    }
}
