$(document).ready(onReady);

const maxMonthlyBudget = 20000;
let employeeData = [];

function onReady() {
    console.log('Hey there! Everything is working just fine 😎');
    $('.submit-button').on('click', addEmployee);
    $('tbody').on('click', '.delete-button', fireEmployee);
    // let el = $('#budget-remaining');
    // el.empty();
    // el.append(monthlyBudget); <-- ** Not sure how to handle this yet
}

function addEmployee(event){
    // Need to stop the Form on HTML from doing its default behavior (refreshing, etc.):
    event.preventDefault();
    
    // GETTERS: 
    // reading the values in each field that user provides
    // UPDATE: turned this from separate variables into one object per employee! 
    let newEmployee = {
        firstName: $('#first-name').val(),
        lastName: $('#last-name').val(),
        idNum: $('#id-num').val(),
        jobTitle: $('#job-title').val(),
        salary: $('#employee-salary').val()
    }

    // Pushing the data for each employee added into an array (global variable)
    // Can't forget to test this in the console
    employeeData.push(newEmployee);
    console.log('New employee added:', newEmployee);
    console.log('This is the whole employee list:', employeeData);

    // append the value that user provided to a new row in the table below (on the DOM)
    // **had to use backticks for multiple line, & string interpolation for object.property name**
    // NOTE: there appears to be a bug on line 46 with salary. In the DOM table, annual salary
    // is being shown as [object Object]
    $('tbody').append(`
    <tr>
        <td>${newEmployee.firstName}</td>
        <td>${newEmployee.lastName}</td>
        <td>${newEmployee.idNum}</td>
        <td>${newEmployee.jobTitle}</td>
        <td>${newEmployee.salary}</td>
        <td class='delete-cell'><button class='delete-button'>🔥</button></td>
    </tr>
    `);

    // SETTERS:
    //now to clear the values in each field when the user clicks "submit" and data is put in 
    // the table in the center of the DOM: 
    $('#first-name').val('');
    $('#last-name').val('');
    $('#id-num').val('');
    $('#job-title').val('');
    $('#employee-salary').val('');

    calcMonthlyBudget();
}

function calcMonthlyBudget(){

    let monthlyBudget = 0;
    for(let i = 0; i < employeeData.length; i++){
        // need to divide salary by 12 months 
        let annualSalary = Number(employeeData[i].salary);
        let monthlySalary = Number(annualSalary / 12);

        // start cumulating those monthly salaries! 
        monthlyBudget += monthlySalary;
    }
    
    let el = $('#monthly-budget');
    el.empty();
    el.append(monthlyBudget);
}

function fireEmployee(){
    // when fire emoji is pressed, remove the row
    $(this).parent().parent().remove();
}