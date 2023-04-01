$(document).ready(onReady);

function onReady() {
    console.log('Hey there! Everything is working just fine 😎');
    $('.submit-button').on('click', addEmployee);
    $('tbody').on('click', '.delete-button', fireEmployee);
}

function addEmployee(event){
    // Need to stop the Form on HTML from doing its default behavior (refreshing, etc.):
    event.preventDefault();
    console.log('You can add employee info now!');
    // reading the values in each field that user provides
    let readFirstName = $('#first-name').val();
    let readLastName = $('#last-name').val();
    let readIdNum = $('#id-num').val();
    let readJobTitle = $('#job-title').val();
    let readSalary = $('#salary').val();
    // append the value that user provided to a new row in the table below (on the DOM)
    // **had to use backticks for multiple line, & string interpolation for variable name**
    $('tbody').append(`
    <tr>
        <td>${readFirstName}</td>
        <td>${readLastName}</td>
        <td>${readIdNum}</td>
        <td>${readJobTitle}</td>
        <td>${readSalary}</td>
        <td class='delete-cell'><button class='delete-button'>🔥</button></td>
    </tr>
    `);
    // now to clear the values in each field when the user clicks "submit" and data is put in 
    // the table in the center of the DOM: 
    $('#first-name').val('');
    $('#last-name').val('');
    $('#id-num').val('');
    $('#job-title').val('');
    $('#salary').val('');
}

function fireEmployee(){
    // when fire emoji is pressed, remove the row
    $(this).parent().parent().remove();
}