const inquirer = require("inquirer");
const db = require("./config/connection");
const questionsMainMenu = [
    {
      type: 'list',
      message: 'What would you like to do?',
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
  await inquirer.prompt(questionsMainMenu).then((data) => processMainMenu(data));
}

// Function call to initialize app
init();

async function processMainMenu(data){
    switch(data.options){
        case "View All Employees":
            viewAllEmployees();
            break;
        case "Add Employee":
            await addEmployee();
            break;
        case "Update Employee Role":
            updateEmployeeRole();
            break;
        case "View All Roles":
            viewAllRoles();
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
    console.log(rows);
    return rows;
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
    console.log(rows);
    return rows;
}

async function addRole(){
   await inquirer.prompt(questionsAddRole).then((data) => console.log(data));
}

async function viewAllDepartments(){
    const dbConn = await db;
    const [rows] = await dbConn.query(`SELECT * FROM department`);
    console.log(rows);
    return rows;
}

async function addDepartment(){
   await inquirer.prompt(questionsAddDepartment).then((data) => console.log(data.departmentName));
}

function exitApp(){
    process.exit()
}