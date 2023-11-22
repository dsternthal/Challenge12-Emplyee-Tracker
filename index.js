const inquirer=require("inquirer")
const mysql=require("mysql2")
const {printTable}=require("console-table-printer")
require("dotenv").config()

const db = mysql.createConnection({
    host:"localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.database,
    port:3306
})
db.connect(()=>{
    mainMenu()
})

function mainMenu(){
    inquirer.prompt({
        type:"list",
        message:"What would you like to do?",
        name:"selection",
        choices: ["view all departments","view all roles","view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
    })
    .then(answer =>{

        if(answer.selection==="view all employees"){
            viewEmployees()
        }else if(answer.selection==="add an employee"){
            addEmployee()
        }else if(answer.selection==="update an employee role"){
            updateEmployeeRole()
        }
    })
}

function viewEmployees(){
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, title, name as department, salary, CONCAT(bosses.first_name,' ',bosses.last_name) as manager 
    from employee
    left join role on employee.role_id = role.id
    left join department on department.id = role.department_id
    left join employee as bosses on employee.manager_id = bosses.id;`, (err,data)=>{
        printTable(data)
        mainMenu()
    })
}

function addEmployee(){

}

function updateEmployeeRole(){

}