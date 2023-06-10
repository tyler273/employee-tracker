const inquirer = require("inquirer");
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

// TODO: Create a function to initialize app
function init() {
  inquirer.prompt(questionsMainMenu).then((data) => processMainMenu(data));
}

// Function call to initialize app
init();

async function processMainMenu(data){
    switch(data.options){
        case "View All Employees":
            viewAllEmployees();
            break;
        case "Add Employee":
            addEmployee();
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
            viewAllDepartments();
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

function viewAllEmployees(){
    console.log("We will view all employees here!")
}

function addEmployee(){
    console.log("We will add an employee!")
}

function updateEmployeeRole(){
    console.log("We will update employee role!")
}

function viewAllRoles(){
    console.log("We will view all roles")
}

async function addRole(){
   await inquirer.prompt(questionsAddRole).then((data) => console.log(data));
}

function viewAllDepartments(){
    console.log("We will view all departments!")
}

async function addDepartment(){
   await inquirer.prompt(questionsAddDepartment).then((data) => console.log(data.departmentName));
}

function exitApp(){
    process.exit()
}