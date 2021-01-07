// install dependencies
"use strict";
const inquirer = require("inquirer");
const table = require("console.table")

// set up connection to mySQL
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'bruceyboy143',
  database: "employees_db"
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

// question prompts
function start(){
    inquirer.prompt({
        type: "list",
        name: "choices",
        message: "Hello and welcome to Employeetracker! What would you like to do?",
        choices: [
            "Add a position",
            "Add an employee",
            "Add a department",
            "View all positions",
            "View all departments",
            "View all employees",
            "Update employee roles"
        ]
    }).then(function(answer){
        if(answer.choices==="Add a position"){
            addPosition();
        } 
        else if (answer.choices==="Add an employee"){
            addEmployee();
        }
        else if (answer.choices==="Add a department"){
            addDepartment();
        }
        else if(answer.choices==="View all positions"){
            viewAllPositions();
        }
        else if(answer.choices==="View all employees"){
            viewAllEmployees();
        } 
    })
}
start();

function viewAllEmployees(){
    console.log("test");
    connection.query("SELECT * FROM employee", function(err, res){
        console.table(res);
    })
}
