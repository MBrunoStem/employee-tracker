const connection = require('./connection.js');

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

module.exports = Database;