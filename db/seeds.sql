USE company_db;

INSERT INTO department (dept_name)
VALUES ('Test')

INSERT INTO roles (roles_name, salary, department_id)
VALUES ('Engineer', 90000, 1)

INSERT INTO employee (first_name, last_name, roles_id)
VALUES ('Mario', 'Bruno', 2)