import { useState } from 'react';
import '../public/styles/App.css';
import Header from './Header';
import Screen from './Screen';
import Keypad from './Keypad';
function App() {
  const headerText = 'React Calculator';

  //basic state variables to keep track of a calculation
  const [firstVal, setFirstVal] = useState('');
  const [secondVal, setSecondVal] = useState('');
  const [operator, setOperator] = useState('');
  //state for the currently displayed key
  const [displayVal, setDisplayVal] = useState('');
  //flag for deciding if we are currently entering first or second value in a calculation
  const [onFirstVal, setOnFirstVal] = useState(true);
  //flag for deciding if we should append to currently display value string or start a new one
  const [appendVal, setAppendVal] = useState(true);
  //state for storing the current displayed value when memory storage key is pressed
  const [memVal, setMemVal] = useState('');

  const onBtnClick = ({ type, text, value }) => {
    switch (type) {
      case 'clear':
        text === 'AC' ? allClear() : clearCurrentVal();
        break;
      case 'enter':
        computeResult();
        break;
      case 'memory':
        memoryActionSwitch(text, value);
        break;
      case 'number': {
        numberActionSwitch(text, value);
        break;
      }
      //the +, -, *, / route
      case 'operator':
        //if already enter second number, compute result first
        if (operator && firstVal && secondVal) {
          computeResult();
        }
        //update operator and set to watch for second input value
        setOperator(value);
        setOnFirstVal(false);
        setAppendVal(false);
        break;
      case 'percent': {
        const newVal = (parseFloat(displayVal) / 100).toString();
        setOperator(value);
        setDisplayVal(newVal);
        updateCurVal(newVal);
        break;
      }
      case 'sign': {
        //convert value to float, flip its sign then convert back to string
        const newVal = (parseFloat(displayVal) * -1).toString();
        setDisplayVal(newVal);
        //decide which state variable to update based on what's displayed. if we are on first
        //value, then the second value is always empty
        secondVal == '' ? setFirstVal(newVal) : setSecondVal(newVal);
        break;
      }
      case 'sqrt': {
        const newVal = Math.sqrt(parseFloat(displayVal)).toString();
        setDisplayVal(newVal);
        secondVal == '' ? setFirstVal(newVal) : setSecondVal(newVal);
        break;
      }
    }
  };

  const memoryActionSwitch = (text, value) => {
    switch (text) {
      case 'MS':
        setMemVal(displayVal);
        break;
      case 'MC':
        setMemVal(0);
        break;
      case 'MR':
        setDisplayVal(memVal);
        break;
      case 'M-': {
        const result = displayVal - memVal;
        setDisplayVal(result);
        break;
      }
      case 'M+': {
        const result = displayVal + memVal;
        setDisplayVal(result);
        break;
      }
    }
  };

  const numberActionSwitch = (text, value) => {
    switch (true) {
      //decimal is a special character with edge cases that needs to be handled
      case text === '.' && operator === 'Percent':
        setDisplayVal('0.');
        updateCurVal('0');
        break;
      //if there is already a decimal on screen, simply ignore the decimal key press
      case text === '.' && displayVal.includes('.'):
        break;
      default: {
        //while appenVal flag is on, added behind currently displayed string, else start a new string
        const newVal = appendVal
          ? (displayVal + value).toString()
          : value.toString();
        setDisplayVal(newVal);
        setAppendVal(true);
        updateCurVal(newVal);
        break;
      }
    }
  };

  const updateCurVal = (newVal) => {
    onFirstVal ? setFirstVal(newVal) : setSecondVal(newVal);
  };
  const clearCurrentVal = () => {
    setDisplayVal(0);
    onFirstVal ? setFirstVal('') : setSecondVal('');
  };

  const allClear = () => {
    setFirstVal('');
    setSecondVal('');
    setOperator('');
    setMemVal('');
    setOnFirstVal(true);
    setAppendVal(true);
    setDisplayVal('');
  };
  const computeResult = () => {
    console.log(operator && secondVal);
    //if operator exist, calculate result, else show previous result that was
    //stored in firstVal
    switch (true) {
      case operator === '/' && secondVal === '0':
        allClear();
        setDisplayVal('Error');
        break;
      //only if all three states are filled may we compute the result
      //here we must explicitly check each one against null or javascript will
      //output value of secondVal
      case firstVal !== '' && operator !== '' && secondVal !== '': {
        const expression = firstVal + operator + secondVal;
        //make sure only valid calculator expression is provided before we call eval()
        const re = new RegExp('^[-+]?[0-9]+[-+*/][-+]?[0-9]$');
        if (re.test(expression)) {
          const result = eval(expression).toString();
          setDisplayVal(result);
          //set state variables for next calculation
          setFirstVal(result);
          setSecondVal('');
          setOperator('');
          break;
        }
      }
    }
  };

  return (
    <div className="app">
      <Header text={headerText} />
      <Screen displayVal={displayVal} />
      <Keypad onBtnClick={onBtnClick} />
    </div>
  );
}

export default App;

//Case to handle
//pressing % then . should display '0.' but having a decimal number then press . should do nothing
