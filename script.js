const calculatorDisplay = document.querySelector('h1');
const inputBtn=document.querySelectorAll('button');
const clearBtn=document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;


function sendNumberValue(number){
    //Replace current value if first value entered
    if (awaitingNextValue){
        calculatorDisplay.textContent= number;
        awaitingNextValue= false;
    } else{
      //if current display value is 0, replace it , if not add number
      const displayValue = calculatorDisplay.textContent;
      calculatorDisplay.textContent = displayValue === '0' ? number :
      displayValue + number;
    }
   

    
}
function addDecimal(){
    //if operator pressed don't add decimal
    if (awaitingNextValue) return;

        

    

    //if no decimal add one
    if (!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

// Calculate first and second values depending on operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
  
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
  
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  
    '=': (firstNumber, secondNumber) => secondNumber,
  };
function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);
    // Prevent multiple operators
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;

    }
     
    // assign first value if no value
    if (!firstValue){
        firstValue = currentValue;

    } else{
        
        const calculation = calculate[operatorValue](firstValue,currentValue);
        calculatorDisplay.textContent= calculation
        firstValue = calculation;

    }
    //ready for next value,store operator
    awaitingNextValue= true; 
    operatorValue=operator;
   
    

}


//Add Event listners
inputBtn.forEach((inputBt) => {
    if(inputBt.classList.length===0){
        inputBt.addEventListener('click',() => sendNumberValue(inputBt.value));
    } else if (inputBt.classList.contains('operator')){
        inputBt.addEventListener('click',() => useOperator(inputBt.value));

    }else if (inputBt.classList.contains('decimal')){
        inputBt.addEventListener('click',() => addDecimal());
    }    

});


// Reseet  all values Display
function restAll(){
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue= false;
    calculatorDisplay.textContent = "0";
}
// Event listner
clearBtn.addEventListener('click', restAll);
