USE company_db;

INSERT INTO department (id, dept_name)
VALUES (1, 'Test')

INSERT INTO roles (id, roles_name, salary, department_id)
VALUES (2, 'Engineer', 90000, 1)

INSERT INTO employee (id, first_name, last_name, roles_id)
VALUES (3, 'Mario', 'Bruno', 2)