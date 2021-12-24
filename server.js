const inquirer = require('inquirer');
const mysql2 = require('mysql2');

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
                    viewDept()
                    break;
                case 'View All Roles':
                    viewRoles()
                    break;
                case 'View All Employees':
                    viewEmployees()
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
            }
        })
    }
}

init();