const Admin = require("../Models/AdminModel");

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');


exports.adminLogin = async function (req, res) {
    Admin.findOne({ AdminEmail: req.body.AdminEmail }, function (err, admin) {
        if (err) return res.status(500).send({ auth: false });
        if (!admin) return res.status(404).send({ auth: false });

        var passwordIsValid = bcrypt.compareSync(req.body.AdminPassword, admin.AdminPassword);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        var token = jwt.sign({ id: admin._id }, config.secret, {
            expiresIn: 86400
        });

        res.status(200).send({ auth: true, token: token, adminid: admin._id, adminname: admin.AdminName });
    });
}

exports.adminRegistration = async function (req, res) {
    var hashPassword = bcrypt.hashSync(req.body.AdminPassword, 8);
    Admin.create({
        AdminName: req.body.AdminName,
        AdminEmail: req.body.AdminEmail,
        AdminPassword: hashPassword,
    },
        function (err, admin) {
            if (err) return res.status(500).send({ auth: false })
            var token = jwt.sign({ id: admin._id }, config.secret, {
                expiresIn: 83400
            });
            res.status(200).send({ auth: true, token: token });
        });
}
