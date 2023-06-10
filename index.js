const inquirer = require("inquirer");
const questionsMainMenu = [
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'options',
      choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
    },
];

// TODO: Create a function to initialize app
function init() {
  inquirer.prompt(questionsMainMenu).then((data) => processMainMenu(data));
}

// Function call to initialize app
init();

function processMainMenu(data){
    switch(data.options){
        case "View All Employees":
            viewAllEmployees();
            break;
        case "Add Employee":
            console.log("We are going to add an employee!")
            break;
    }
};

function viewAllEmployees(){
    console.log("We will view all employees here!")
}