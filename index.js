const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');
const db = require('./db');

function init() {
    function startApp() {
        inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'What would you like to do?',
                choices: [
                    'View All Departments',
                    'View All Roles',
                    'View All Employees',
                    'Add A Department',
                    'Add A Role',
                    'Add An Employee',
                    'Update An Employee Role'
                ]
            }
        ]).then((choice) => {
            switch (choice.choice) {
                case 'View All Departments':
                    viewAllDepartments()
                    break;
                case 'View All Roles':
                    viewAllRoles()
                    break;
                case 'View All Employees':
                    viewAllEmployees()
                    break;
                case 'Add A Department':
                    addDept()
                    break;
                case 'Add A Role':
                    addRole()
                    break;
                case 'Add An Employee':
                    addEmployee()
                    break;
                case 'Update An Employee Role':
                    updateRole()
                    break;
                default:
                    return process.exit();
            }
        })
        function addDept() {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'deptName',
                    message: 'Please enter Department name:'
                },
            ]).then(answers => {
                let deptName = answers
                db.createDepartment(deptName).then( ()=> {
                    console.log(`Added new department name:${deptName.deptName}`)
                }).then( ()=> {
                    startApp()
                })
            })
        }
        function addRole() {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'Please enter Role name:'
                },
                {
                    type: 'input',
                    name: 'id',
                    message: 'Please enter Role ID:'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Please enter salary:'
                },
            ]).then(role => {
                db.createRole(role).then( ()=> {
                    console.log(`Added new role named:${role.name}`)
                }).then( ()=> {
                    startApp()
                })
            })
        }
        function addEmployee() {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Please enter first name:'
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Please enter last name:'
                },
                {
                    type: 'input',
                    name: 'employeeID',
                    message: 'Please enter Employee ID:'
                },
            ]).then(employee => {
                db.createEmployee(employee).then( ()=> {
                    console.log(`Added new employee named:${employee.name}`)
                }).then( ()=> {
                    startApp()
                })
            })
        }
    }
    startApp()
};

init();