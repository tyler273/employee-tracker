const inquirer = require("inquirer");
const db = require("./config/connection");
const { table } = require("table");
const figlet = require("figlet");
const questionsMainMenu = [
    {
      type: 'list',
      message: "What would you like to do?",
      name: 'options',
      choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Exit']
    },
];
const questionsAddDepartment = [
    {
        type: 'input',
        message: "What is the name of the department?",
        name: 'departmentName'
    }
];

const questionsAddRole = [
    {
        type: 'input',
        message: "What is the name of the role?",
        name: 'roleName'
    },
    {
        type: 'input',
        message: "What is the salary of the role?",
        name: 'salary'
    },
    {
        type: 'list',
        message: "Which department does the role belong to?",
        name: 'departmentList',
        choices: ['Engineering', 'Finance', 'Legal', 'Sales', 'Service']
    }
];

const questionsAddEmployee = [
    {
        type: 'input',
        message: "What is the employee's first name?",
        name: 'employeeFirstName'
    },
    {
        type: 'input',
        message: "What is the employee's last name?",
        name: 'employeeLastName'
    },
    {
        type: 'list',
        message: "What is the employee's role?",
        name: 'roleList',
        choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer', 'Customer Service']
    },
    {
        type: 'list',
        message: "Who is the employee's manager?",
        name: 'managerList',
        choices: ['John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Kunal Singh', 'Malia Brown']
    }
];

// TODO: Create a function to initialize app
async function init() {
  await inquirer.prompt(questionsMainMenu).then((data) => processMainMenu(data))
};

figlet("Employee Tracker", function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
    // Function call to initialize app
    init();
});

async function processMainMenu(data){
    switch(data.options){
        case "View All Employees":
            await viewAllEmployees();
            break;
        case "Add Employee":
            await addEmployee();
            break;
        case "Update Employee Role":
            updateEmployeeRole();
            break;
        case "View All Roles":
            await viewAllRoles();
            break;
        case "Add Role":
            await addRole();
            break;
        case "View All Departments":
            await viewAllDepartments();
            break;
        case "Add Department":
            await addDepartment();
            break;
        case "Exit":
            exitApp();
            break;
    }
    init();
};

async function viewAllEmployees(){
    const dbConn = await db;
    const [rows] = await dbConn.query(`SELECT * FROM employee`);
    createTable(rows);
}

async function addEmployee(){
    await inquirer.prompt(questionsAddEmployee).then((data) => console.log(data));
}

function updateEmployeeRole(){
    console.log("We will update employee role!")
}

async function viewAllRoles(){
    const dbConn = await db;
    const [rows] = await dbConn.query(`SELECT * FROM role`);
    createTable(rows);
}

async function addRole(){
    await inquirer.prompt(questionsAddRole).then((data) => console.log(data));
}

async function viewAllDepartments(){
    const dbConn = await db;
    const [rows] = await dbConn.query(`SELECT * FROM department`);
    createTable(rows);
}

async function addDepartment(){
    const newDepartmentData = await inquirer.prompt(questionsAddDepartment);
    const dbConn = await db;
    const [rows] = await dbConn.query(`INSERT INTO department(name) VALUES ("${newDepartmentData.departmentName}")`);
}

function exitApp(){
    process.exit()
}

// turned data from object into array
function createTable(rows){
    let array;
    array = [Object.keys(rows[0]), ...rows.map((val) => Object.values(val))];
    console.log(table(array));
}