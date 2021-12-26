const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'xairmo',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);

// Create a department
app.post('/api/new-department', ({ body }, res) => {
    const sql = `INSERT INTO movies (dept_name)
      VALUES (?)`;
    const params = [body.dept_name];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

// Read all departments
app.get('/api/department', (req, res) => {
    const sql = `SELECT id, dept_name AS title FROM department`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Read list of all roles and associated department name using LEFT JOIN
app.get('/api/department-roles', (req, res) => {
    const sql = `SELECT department.dept_name AS department, roles.roles_name FROM roles LEFT JOIN department ON roles.department_id = department.id ORDER BY department.dept_name;`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Prompt input using Inquirer  
// function init() {
//     function startApp() {
//         inquirer.prompt([
//             {
//                 type: 'list',
//                 name: 'choice',
//                 message: 'What would you like to do?',
//                 choices: [
//                     'View All Departments',
//                     'View All Roles',
//                     'View All Employees',
//                     'Add A Department',
//                     'Add A Role',
//                     'Add An Employee',
//                     'Update An Employee Role'
//                 ]
//             }
//         ]).then((choice) => {
//             switch (choice.choice) {
//                 case 'View All Departments':
//                     viewDept()
//                     break;
//                 case 'View All Roles':
//                     viewRoles()
//                     break;
//                 case 'View All Employees':
//                     viewEmployees()
//                     break;
//                 case 'Add A Department':
//                     addDept()
//                     break;
//                 case 'Add A Role':
//                     addRole()
//                     break;
//                 case 'Add An Employee':
//                     addEmployee()
//                     break;
//                 case 'Update An Employee Role':
//                     updateRole()
//                     break;
//                 default:
//                     renderDB();
//             }
//         })
//     }
//     startApp()
// }

// init();

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});