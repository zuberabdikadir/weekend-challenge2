console.log('JS IS READY')

$(document).ready(readyNow)

let currentOperator = '';

function readyNow() {
    console.log('JQ');
    $('#equalBtn').on('click', calculationInputs);
    $('.math').on('click', mathFunction);
    $('#clearBtn').on('click', clearInput);
    getCalculation();
}

function calculationInputs() {
    let inputs = {};
    inputs.firstNumber  = $('#number1').val();
    inputs.secondNumber = $('#number2').val();
    console.log('Operation', currentOperation);
    inputs.operator = currentOperation;
    console.log('operation is sent to server', inputs.operator);
    console.log('inputs to formulate calculations', inputs);
    postCalculation(inputs);
}

function mathFunction() {
    currentOperation = $(this).attr('value');
}

function postCalculation(obj) {
    $.ajax({
        method: 'POST',
        url: '/calculation',
        data: obj
    }).then(function (response) {
        console.log('Post Success', response);
        getCalculation();
    });
}

function getCalculation() {
    $.ajax({
        method: 'GET',
        url: '/calculation'
    }).then(function (response) {
        console.log('Got Response', response);
        appendCalculation(response)
    }).catch(function (error) {
        console.log('Error', error);
        alert('Something bad happened. Try again later.')
    });
}

function appendCalculation(equationHistory) {
    $('#equations').empty();
    for (equation of equationHistory) {
        $('#answer').empty();
        $('#answer').append(` ${equation.answer}`);
        $('#equations').append(`
        <li>${equation.firstNumber} ${equation.operator} ${equation.secondNumber} = ${equation.answer}</li>
        `);
    }
}

function clearInput() {
    $('#number1').val('');
    $('#number2').val('');
    currentOperator = "";
}