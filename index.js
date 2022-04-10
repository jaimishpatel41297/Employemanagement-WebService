const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');

const app = express();
const port = 8000;

const mongoDbUrl = "mongodb+srv://DiversityOfLiving:3380DiversityOfLiving@diversityoflivingdataba.shlye.mongodb.net/Employee";
// const mongoDbUrl = "mongodb://localhost:27017/Employee";


const corsOptions = {
    origin: "*",
    credentials: true
}
//http://localhost:8000/employee/
app.use(bodyParser.json());
app.use(cors(corsOptions));

const employeeRouter = require('./EmployeeManagement-Routers/EmployeeRouter');
const adminRouter = require('./EmployeeManagement-Routers/AdminRouter');
const projectRouter = require('./EmployeeManagement-Routers/ProjectRouter');
const TaskRouter = require('./EmployeeManagement-Routers/TaskRouter');
const EmployeeAttendanceRouter = require('./EmployeeManagement-Routers/EmployeeAttendanceRoute');
const LeaverequestRouter = require('./EmployeeManagement-Routers/LeaveRequestRoute');
const MeetingRouter = require('./EmployeeManagement-Routers/MeetingRoute');


app.use('/employee', employeeRouter);
app.use('/admin', adminRouter);
app.use('/project', projectRouter);
app.use('/task', TaskRouter);
app.use('/attendance', EmployeeAttendanceRouter);
app.use('/leaveRequest', LeaverequestRouter);
app.use('/meeting', MeetingRouter);

app.listen(port, function () {
    console.log('Express server listening on port ' + port);
    mongoose.connect(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
});