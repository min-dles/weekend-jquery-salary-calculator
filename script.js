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
        <td class='employee-id'>${newEmployee.idNum}</td>
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

    // Set Monthly Budget background to RED if above $20k 
        // And undo if BELOW $20k
    // if (monthlyBudget > maxMonthlyBudget){
        // $('#budget-section').css('background-image', 'linear-gradient(orange, red, orange)');
    // } else if (monthlyBudget <= maxMonthlyBudget){
        // $('#budget-section').css('background-image', 'none');
    // }
    $('#budget-section').css('background-image', monthlyBudget > 20 * 1000 ? 'linear-gradient(orange, red, orange)' : 'none');
}

function fireEmployee(){
    // 1. identify the row that is being deleted by Employee ID: 
    let employeeID = $(this).parent().siblings('.employee-id').text();

    // 2. when fire emoji is pressed, remove the row (DOM)
    $(this).parent().parent().remove();
    
    // 3. reset the array with another function 
    employeeData = removeObjectWithId(employeeData, employeeID);

    // 4. update the budget based on this new array / data
    calcMonthlyBudget();
}

// function to update the employeeData array:
function removeObjectWithId(array, id) {

    function objectByEmployeeId(employeeObject){
        return employeeObject.idNum === id; // check that id is equal to the idNum in the object
    };

    // use built-in method findIndex() to get the index for the appropriate employee object 
    const objectWithIdIndex = array.findIndex(objectByEmployeeId);

    // this if statement will only run if there is a match between the ID parameter
    // and any ID in employeeData array 
    if (objectWithIdIndex > -1) {
      array.splice(objectWithIdIndex, 1);
    }
  
    // employeeData is now going to be passed back to fireEmployee() function [step 3.]
    return array;
  }
  