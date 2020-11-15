// Get express, it's going to be my web server
// This gives us the whole library
const express = require('express');
// Will need bodyParser for POST requests
const bodyParser = require('body-parser');
// This creates an instance of the express web server
const app = express();
const port = 5000;
// Setup bodyParser - parses the body of the request
// jquery $.ajax uses urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
// axios (will see w/ React in w11) uses json
app.use(bodyParser.json());
// Setup static files service
app.use(express.static('server/public'));

// array to hold answers and data
let calculationData = [];
let answerArr = [];


//routes
app.get('/calculation', function (req, res) {
    console.log('GET hit');
    res.send(answerArr);
});

app.post('/calculation', (req, res) => {
    answerArr = req.body;
    console.log('CalculationData =', calculationData)
    res.sendStatus(200);
    renderCalculation(calculationData)
})
function renderCalculation() {
    if (calculationData.buttonPushed === '+') {
        calculationData.answer = Number(calculationData.firstNumber) + Number(calculationData.secondNumber)
    } else if (calculationData.buttonPushed === '-') {
        calculationData.answer = Number(calculationData.firstNumber) - Number(calculationData.secondNumber)
    } else if (calculationData.buttonPushed === '*') {
        calculationData.answer = Number(calculationData.firstNumber) * Number(calculationData.secondNumber)
    } else if (calculationData.buttonPushed === '/') {
        calculationData.answer = Number(calculationData.firstNumber) / Number(calculationData.secondNumber)
    }
    answerArr.push(calculationData)
    console.log('Addition Array', answerArr)
    calculationData = {};
}



// Start the server so it listens for requests
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
})