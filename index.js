const inquirer = require('inquirer');
// const connection = require("./db/connection");
const mysql = require('mysql2');
const table = require('console.table');
// const Database = require('./Database');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "testing12345",
    database: "company_db",
});
connection.connect((err) => {
    if (err)throw err;
});

class Database {
    constructor(connection) {
        this.connection = connection;
    }
    viewAllDepartments() {
        return this.connection.promise().query(
            'SELECT department.id FROM department'
        )
    }
    viewAllRoles() {
        return this.connection.promise().query(
            'SELECT roles.id, role.salary, role.roles_title, department.name AS department FROM roles LEFT JOIN department on roles.department_id=department.id'
        )
    }
    viewAllEmployees() {
        return this.connection.promise().query(
            'SELECT employee.id, employee.first_name, employee.last_name, roles.name AS roles FROM employee LEFT JOIN roles on employee.roles_id=roles.id'
        )
    }
createDepartment(department) {
     return this.connection.promise().query(`INSERT INTO department SET ?`, department)
};

createRole(role) {
    return this.connection.promise().query(`INSERT INTO role SET ?` , role);
};

createEmployee(employee) {
    return this.connection.promise().query(`INSERT INTO employee SET ?`, employee);
};

updateRoles() {
    return this.connection.promise().query(`UPDATE roles SET role = ? WHERE id = ?`);
};
}

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
                    name: 'depID',
                    message: 'Please enter Department ID:'
                },
                {
                    type: 'input',
                    name: 'deptName',
                    message: 'Please enter Department name:'
                },
            ]).then(answers => {
                Database.createDepartment(answers).then( ()=> {
                    console.log(`Added new department name:${answers.deptName}`)
                }).then( ()=> {
                    startApp()
                })
            })
        }
        function addRole() {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'id',
                    message: 'Please enter Role ID:'
                },
                {
                    type: 'input',
                    name: 'name',
                    message: 'Please enter Role name:'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Please enter salary:'
                },
            ]).then(role => {
                Database.createRole(role).then( ()=> {
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
                Database.createEmployee(employee).then( ()=> {
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