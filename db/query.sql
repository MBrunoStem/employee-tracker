SELECT department.dept_name AS department, roles.roles_name
FROM roles
LEFT JOIN department
ON roles.dept_id = dept.id
ORDER BY department.dept_name;