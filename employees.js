// install dependencies
"use strict";
const inquirer = require("inquirer");
const table = require("console.table")
var mysql = require("mysql");

// establish connection to server
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "bruceyboy143",
    database: "employees_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});

// question prompts
function start() {
    inquirer.prompt({
        type: "list",
        name: "choices",
        message: "Hello and welcome to Employeetracker! What would you like to do?",
        choices: [
            "Add a position", "Add an employee", "Add a department", "View all positions", "View all departments", "View all employees", "Update employee roles", "Exit"
        ]
    }).then(function (answer) {
        if (answer.choices === "Add a position") {
            addPosition();
        }
        else if (answer.choices === "Add an employee") {
            addEmployee();
        }
        else if (answer.choices === "Add a department") {
            addDepartment();
        }
        else if (answer.choices === "View all departments") {
            viewAllDepartments();
        }
        else if (answer.choices === "View all positions") {
            viewAllPositions();
        }
        else if (answer.choices === "View all employees") {
            viewAllEmployees();
        }
        else if (answer.choices === "Update employee roles") {
            updateEmployeeRoles();
        } else {
            connection.end();
        }
    })
}
// add positions, employees, and departments
function addPosition() {
    inquirer.prompt([
        {
            name: "position",
            type: "input",
            message: "What type of position do you want to add?"
        },
        {
            name: "salary",
            type: "input",
            message: "What salary will this position have?"
        },
        {
            name: "department_id",
            type: "input",
            message: "What is the department id of this position?"
        }
    ]).then(function (answer) {
        // This will add a new role to the db
        connection.query("INSERT INTO role SET ?",
            {
                title: answer.position,
                salary: answer.salary,
                department_id: answer.department_id
            },
            function (err) {
                if (err) throw err;
                console.log("Your position was added successfully!");
                start();
            }
        );
    });
}

function addEmployee() {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is the first name of the employee being added?"
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the last name of the employee being added?"
        },
        {
            name: "roleId",
            type: "number",
            message: "What is the role id of the employee being added?"
        },
        {
            name: "managerId",
            type: "number",
            message: "What is the manager id of the employee being added?"
        }
    ]).then(function (answer) {
        // This will add a new position to the db
        connection.query("INSERT INTO employee SET ?",
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.roleId,
                manager_id: answer.managerId
            },
            function (err) {
                if (err) throw err;
                console.log("Your employee was added successfully!");
                start();
            }
        );
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            name: "deptName",
            type: "input",
            message: "What is the first name of the department you would like to add?"
        },
    ]).then(function (answer) {
        // This will add a new department to the db
        connection.query("INSERT INTO department SET ?",
            {
                name: answer.deptName,
            },
            function (err) {
                if (err) throw err;
                console.log("Department was added successfully!");
                start();
            }
        );
    });
}
// View all Departments and Positions
function viewAllDepartments() {
    console.log("Selecting all departments...\n");
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function viewAllPositions() {
    console.log("Selecting all roles...\n");
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });

}

function viewAllEmployees() {
    console.log("Selecting all employees...\n");
    connection.query("SELECT * FROM employee", function (err, res) {
        console.table(res);
    })
}

// update roles
// function updateEmployeeRoles() {
//     console.log("Updating employee roles...\n");
//     inquirer.prompt([{
//         name: "newTitle",
//         type: "input",
//         message: "What is the new job title you would like to add?"
//     },
//     {
//         name: "newSalary",
//         type: "input",
//         message: "What is the salary for this new job?"
//     },
//     {
//         name: "newDeptId",
//         type: "input",
//         message: "What is the new department ID for this role?"
//     }]).then(function (answer) {
//         connection.query("UPDATE role SET ? WHERE ?",
//             [
//                 {
//                     new_title: answer.newTitle,
//                 },
//                 {
//                     new_salary: answer.newSalary,
//                 },
//                 {
//                     new_id: answer.newDeptId,
//                 },
//                 function (err) {
//                     if (err) throw err;
//                     console.log("Department was added successfully!");
//                     start();
//             ]
//     })

// }


