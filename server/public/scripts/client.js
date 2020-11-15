console.log('JS IS READY')

$(document).ready(readyNow)

function readyNow() {
    console.log('JQ')
    $('#equalButton').on('click', calculationInputs)
    $('.math').on('click', mathFunction)
    $('#clearButton').on('click', clearInput)
    getCalculation();
}
let button;

function calculationInputs() {
    let inputs = {};
    let firstNumber = $("#number1").val();
    let secondNumber = $("#number2").val();
    console.log('Button', button)
    inputs.firstNumber = firstNumber
    inputs.secondNumber = secondNumber
    inputs.buttonPushed = button
    console.log('button is sent to server', inputs.buttonPushed)
    console.log(`inputs to formulate calculations`, inputs);
    postCalculation(inputs);
}

function mathFunction() {
    button = $(this).attr('value');
    return button
}

function postCalculation(obj) {
    $.ajax({
        method: 'POST',
        url: '/calculation',
        data: obj
    }).then(function (response) {
        console.log('Post Success', response);
        getCalculation();
    })
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
    })

}

function appendCalculation(answerArr) {
    $('#equations').empty();
    for (item of answerArr) {
        $('#answer').empty();
        $('#answer').append(` ${item.answer}`)
        $('#equations').append(`
        <li>${item.firstNumber} ${item.buttonPushed} ${item.secondNumber} = ${item.answer}</li>
        `)
    }
    answerArr = [];
}

function clearInput() {
    $('#number1').val('');
    $('#number2').val('');
}