const { response } = require("express");
const Project = require("../Models/ProjectModel");


exports.getAllProject = async function (req, res) {
    await Project.find({}, function (err, projectdata) {
        if (err) return res.status(500).send({ response: false });

        res.status(200).send(projectdata);
    });
}

exports.getSingleProject = async function (req, res) {
    await Project.findById(req.params.id, function (err, projectdata) {
        if (err) return res.status(500).send({ auth: false });
        res.status(200).send(projectdata);
    });
}

exports.getProjectByEmployee = async function (req, res) {
    await Project.find({ ProjectEmployeeAssignees: req.params.ProjectEmployeeAssignees }, function (err, projectdata) {
        if (err) return res.status(500).send({ response: false });
        if (!projectdata) return res.status(404).send({ response: false });
        res.status(200).send(projectdata);
    })
}

exports.getProjectByEmployeeOrDueDate = async function (req, res) {
    await Project.find({ $or: [{ ProjectEmployeeAssignees: req.params.data }, { ProjectDueDate: req.params.data }] }, function (err, projectdata) {
        if (err) return res.status(500).send({ response: false });
        if (!projectdata) return res.status(404).send({ response: false });
        res.status(200).send(projectdata);
    })
}

exports.addProject = async function (req, res) {
    await Project.create({
        ProjectName: req.body.ProjectName,
        ProjectEmployeeAssignees: req.body.ProjectEmployeeAssignees,
        ProjectDueDate: req.body.ProjectDueDate
    },
        function (err, projectdata) {
            if (err) return res.status(500).send({ response: false });
            res.status(200).send(projectdata);
        });
}

exports.updateProject = async function (req, res) {
    Project.findByIdAndUpdate(req.body._id, req.body, { new: true }, function (err, projectdata) {
        if (err) return res.status(500).send({ response: false });
        res.status(200).send(projectdata);
    })
}


exports.updateProjectById = async function (req, res) {

    try {
        Project.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, projectdata) {
            if (err) return res.status(500).send({ response: false });
            res.status(200).send(projectdata);
        })
    } catch (err) {
        res.status(500).send(" Error occured " + err + " ");
    }
}


exports.deleteProject = async function (req, res) {
    try {
        Project.findByIdAndRemove(req.params.projectId, function (err, projectdata) {
            if (err) return res.status(500).send({ response: false });
            res.status(200).send({ response: true });
        });
    } catch (err) {
        res.status(500).send("Error is " + err + "")
    }
}

