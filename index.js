const inquirer = require('inquirer');
const database = require('./db')
const table = require('console.table');

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
                    // 'Update An Employee Role',
                    'EXIT'
                ]
            }
        ]).then((choice) => {
            console.log({ choice })
            switch (choice.choice) {
                case 'View All Departments':
                    database.viewAllDepartments()
                    .then(([response]) => {
                        console.log('\n')
                        for (let i = 0; i < response.length; i++) {
                            console.table(`${response[i].id} | ${response[i].dept_name}`)
                        }
                        startApp();
                    })
                    break;
                case 'View All Roles':
                    database.viewAllRoles()
                    .then(([response]) => {
                        console.log('\n')
                        for (let i = 0; i < response.length; i++) {
                            console.log(`${response[i].role_title} | ${response[i].id} | ${response[i].salary} | ${response[i].department} |`)
                        }
                        startApp();
                    })
                    break;
                case 'View All Employees':
                    database.viewAllEmployees()
                    .then(([response]) => {
                        console.log('\n')
                        for (let i = 0; i < response.length; i++) {
                        console.log(`${response[i].id } | ${response[i].last_name}, ${response[i].first_name} | ${response[i].roles_id} | ${response[i].role_title } | ${response[i].salary} | ${response[i].department}` )
                        }
                        startApp()
                    })
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
                // case 'Update An Employee Role':
                //     updateEmployeeRole()
                //     break;
                case 'EXIT':
                    process.exit();
                default:
                    break;
            }
        })
        function addDept() {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'id',
                    message: 'Please enter Department ID:'
                },
                {
                    type: 'input',
                    name: 'dept_name',
                    message: 'Please enter Department name:'
                },
            ]).then(answers => {
                database.createDepartment(answers).then(() => {
                    console.log(`Added new department name:${answers.dept_name}`)
                }).then(() => {
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
                    name: 'role_title',
                    message: 'Please enter Role name:'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Please enter salary:'
                },
                {
                    type: 'input',
                    name: 'department_id',
                    message: 'Please enter corresponding Department ID:'
                },
            ]).then(answers => {
                database.createRole(answers).then(() => {
                    console.log(`Added new role named:${answers.role_title}`)
                }).then(() => {
                    startApp()
                })
            })
        }
        function addEmployee() {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'id',
                    message: 'Please enter Employee ID:'
                },
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'Please enter first name:'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'Please enter last name:'
                },
                {
                    type: 'input',
                    name: 'roles_id',
                    message: 'Please enter corresponding Role ID:'
                },
                {
                    type: 'input',
                    name: 'manager_id',
                    message: 'Please enter corresponding Manager ID:'
                },
            ]).then(answers => {
                database.createEmployee(answers).then(() => {
                    console.log(`Added new employee named:${answers.first_name}`)
                }).then(() => {
                    startApp()
                })
            })
        }
        function updateEmployeeRole() {
            database.viewAllEmployees()
            .then(([rows]) => {
                console.log(rows);
                let allEmployees = rows;
            })
        }
    }
    startApp()
};

init();