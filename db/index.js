const connection = require('../db/connection')

class Database {
    constructor(connection) {
        this.connection = connection;
    }
    viewAllDepartments() {
        return this.connection.promise().query(
            'SELECT dept_name FROM department'
        )
    }
    viewAllRoles() {
        return this.connection.promise().query(
            'SELECT roles.id, roles.role_title, department.dept_name AS department, roles.salary FROM roles LEFT JOIN department ON roles.department_id = department.id'
        )
    }
    viewAllEmployees() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, roles.role_title, department.dept_name AS department, roles.salary, CONCAT(manager.first_name, '', manager.last_name) AS manager FROM employee LEFT JOIN  roles on employee.role_id= roles.id LEFT JOIN department on roles.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        )
    }
    createDepartment(department) {
        return this.connection.promise().query(`INSERT INTO department SET ?;`, department)
    }

    createRole(role) {
        return this.connection.promise().query(`INSERT INTO roles SET ?;`, role);
    }

    createEmployee(employee) {
        return this.connection.promise().query(`INSERT INTO employee SET ?`, employee);
    }
//todo finish this
    // updateRoles(roleID) {
    //     return this.connection.promise().query(`UPDATE employee SET role_id = ? WHERE id = ?`, roleID);
    // }
}

module.exports = new Database(connection)