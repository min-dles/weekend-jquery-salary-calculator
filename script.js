$(document).ready(onReady);

function onReady() {
    console.log('Hey there! Everything is working just fine 😎');
    $('.submit-button').on('click', addEmployee);
}

function addEmployee(event){
    event.preventDefault();
    console.log('You can add employee info now!');
}