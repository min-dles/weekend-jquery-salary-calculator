$(document).ready(onReady);

const maxMonthlyBudget = 20000;
let employeeData = [];

function onReady() {
    console.log('Hey there! Everything is working just fine 😎');
    $('.submit-button').on('click', addEmployee);
    $('tbody').on('click', '.delete-button', fireEmployee);
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
    $('tbody').append(`
    <tr>
        <td>${newEmployee.firstName}</td>
        <td>${newEmployee.lastName}</td>
        <td>${newEmployee.idNum}</td>
        <td>${newEmployee.jobTitle}</td>
        <td class='salary'>${newEmployee.salary}</td>
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
    console.log('employee data:', employeeData);

    if (monthlyBudget > maxMonthlyBudget){
        $('#budget-section').css('background-image', 'linear-gradient(orange, red, orange)');
    }
}

function fireEmployee(){
    // attempt to remove salary info from the budget when employees are deleted
    // OMG learned about siblings selector today!!!
    // let employeeSalary = Number($(this).parent().siblings('.salary').text());
    // let monthlySalary = Number(employeeSalary / 12);

    // GETTER: need to see what monthly budget curently is
    // let monthlyBudget = $('#monthly-budget').text();
    // let updatedBudget = monthlyBudget - monthlySalary;
    // $('#monthly-budget').text(updatedBudget);
    // console.log('Please work:', employeeSalary);

    // It appears there is an issue between deleting & adding employees now. I need
    // to make sure the array is accurate but not sure how to do that. First attempt below:
    // employeeData.splice($(this).parent().parent());
    // I'm encountering a bug when I delete some lines. Will have to come back to this later. 

    // when fire emoji is pressed, remove the row
    $(this).parent().parent().remove();
}