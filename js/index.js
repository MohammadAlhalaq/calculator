/*=================== resize the font if the length text was large ===================*/
function sizeResult() {
  'use strict';
  let lengthResult = output.textContent.length;
    if(lengthResult == 13){
      output.setAttribute('style', 'font-size: 43px')
    }else if(lengthResult == 14){
      output.setAttribute('style', 'font-size: 40px')
    }else if(lengthResult == 15){
      output.setAttribute('style', 'font-size: 37px')
    }else if(lengthResult == 16){
      output.setAttribute('style', 'font-size: 35px');
    }else if(lengthResult > 16){
      alert('Your Number Is long');
    }
}

/*=================== function for dot ('.') ===================*/
function dot(valueBtn){
  if(output.textContent == '-'){
    output.textContent = '';
    output.textContent += '.';
    document.getElementById('dot').disabled = true;
  }else{
    output.textContent += '.';
    document.getElementById('dot').disabled = true;
  }isOneDot = false;
}

/*=================== put value the pressed number on the output screen ===================*/
function lengthFunction(){
  let lengthResult = output.textContent.length;
  if(output.textContent.length < 16){
    if(output.textContent == '-'){output.textContent = ''}
    console.log("value = "+valueBtn);
      output.textContent += valueBtn;
      backspace.disabled= false;
    }else{
      alert('Your Number Is long');
    }
  }





/*=================== The result ===================*/
function equal(){
  'use strict';
  let strNum = output.textContent.toString();
  if(strNum[0]=='0'){
    strNum = strNum.slice(1);
  }
  const equal = eval(strNum);
  if(equal.toString().length > 16){
    output.textContent = equal.toString().substring(0, 16);
  }
  else if(equal == Infinity || equal == -Infinity){
    output.textContent = '-';
    alert('dont divid number on zero');
  }else{
    output.textContent = equal;
  }
  
}



/*=================== event when clicking on any button ===================*/
function click(){
  'use strict';
  audio.play();
  valueBtn = this.value;
  outputNumber = output.textContent;

  if(valueBtn == '.'){
     dot();
   }else if(valueBtn == 'c'){ //clear output
     output.textContent = '-';
     document.getElementById('dot').disabled = false;
     isOneDot = true;
   }else if(valueBtn == 'Backspace'){ //for backspae
     
     if(outputNumber[outputNumber.length-1]=='.'){
       document.getElementById('dot').disabled = false;
       isOneDot = true;
     }
     
     if(outputNumber == ''){
      output.innerHTML = '-';
      // backspace.disabled= true;
      isOneDot = true;
      document.getElementById('dot').disabled = false;
     }else if(outputNumber == '-'){}
     else{
      output.textContent = outputNumber.slice(0, -1);
     }
   }else if(isNaN(valueBtn) && valueBtn != '.'){ // input operator
     if(output.textContent == '-'){ //if input was operator and output  was impety
       alert("Choose a Number");
      
     }else if(outputNumber.slice(-1) == "+" || outputNumber.slice(-1) == "-" || outputNumber.slice(-1) == "*" || outputNumber.slice(-1) == "/" || outputNumber.slice(-1) == "="){
       alert('Use a Number Between The Two Operator');
     }else if(valueBtn == '='){ // if input was "="
       equal();
     }else{//operator
       lengthFunction();
       document.getElementById('dot').disabled = false;
       isOneDot = true;
     }
   }else{ // input number
     lengthFunction();    
   }
  
  sizeResult();
  
} // End Function Click
function clickkey(key){
  if(!isNaN(key) || key == '.'){
    if(output.textContent.length < 16){
      if(key == '.' && output.textContent[output.textContent.length - 1] !== '.'){
        if(output.textContent == "-"){
          output.textContent = "";
          isOneDot = false;
          document.getElementById('dot').disabled = true;
          output.textContent += key;
        }else{
          output.textContent += key;
        }
      }else if(key == '.' && output.textContent[output.textContent.length - 1] == '.'){
        alert('just one dot');
        isOneDot = false;
        document.getElementById('dot').disabled = true;
      }
      if(output.textContent == "-" && key != '.'){
        output.textContent = "";
        output.textContent += key;
      }else if(output.textContent != "-" && key != '.'){
        output.textContent += key;
      }
    }else{
      alert('long number');
    }    
  }

  else if((key == '/' || key == '*' || key == '-' || key == '+' || key == '=') && !isNaN(output.textContent[output.textContent.length-1])){
    if(key == '='){
      equal();
    }else{
      output.textContent += key;
      document.getElementById('dot').disabled = false;
      isOneDot = true;
    }       
  }else if((key == '/' || key == '*' || key == '-' || key == '+' || key == '=')){
    alert('enter number not operator');
  }
  if(key == 'Backspace'){
    if(output.textContent == ""){
      output.textContent = "-";
      document.getElementById('dot').disabled = false;
      isOneDot = true;
    }
    else if(output.textContent[output.textContent.length-1] == '.'){
      document.getElementById('dot').disabled = false;
      isOneDot = true;
    }
    if(output.textContent != "-"){
      output.textContent = output.textContent.slice(0, -1);
    }
  }else if(key == 'c'){
    output.textContent = "-";
    document.getElementById('dot').disabled = false;
    isOneDot = true;
  }
  sizeResult();
}

/*=================== event when clicking on any keybord ===================*/

let buttons = document.querySelectorAll('button');
let dotDisemal = document.getElementById('dot');

/*looping for buttons*/
for(let i = 0; i<buttons.length; i++){
  buttons[i].onclick = click;
}

/*----------keybord---------*/


  function removeTransition(e){
    if(e.propertyName !== 'transform') return;//skip it if its not transform
    this.classList.remove('click');
  }
  
  function pressKey(e){
    let key = e.key;
    let calc ;
    
      if(key == '.' && isOneDot ){
        isOneDot = false;
        document.getElementById('dot').disabled = true;
        if(key == 'Enter'){
          key = '=';
          calc = document.querySelector(`button[value='=']`);
        }else{
          calc = document.querySelector(`button[value='${key}']`);
        }
        if(calc!=null){// add style for pressed button
          calc.classList.add('click');
          audio.play();
          clickkey(key);
        }else if(key=="NumLock" || key=='F5'|| key=='Alt'){
        }else{
          alert('just enter number and operator OR enter on numlock');
        }
        buttons.forEach(key => key.addEventListener('transitionend',removeTransition));//remove style after seconed
        
      }else if(key != '.'){
        if(key == 'Enter'){
          key = '=';
          calc = document.querySelector(`button[value='=']`);
        }else{
          calc = document.querySelector(`button[value='${key}']`);
        }
        if(calc!=null){// add style for pressed button
          calc.classList.add('click');
          audio.play();
          clickkey(key);
        }else if(key=="NumLock" || key=='F5'|| key=='Alt'){
        }else{
          alert('just enter number and operator OR enter on numlock');
        }
        buttons.forEach(key => key.addEventListener('transitionend',removeTransition));//remove style after seconed
        
      }
  }
  window.addEventListener('keydown', pressKey);
  
  // remove style 

/*=================== Varibles ===================*/
let valueBtn, outputNumber, result,
    clear = document.getElementById('clear'),
    backspace = document.getElementById('backspace'),
    output = document.querySelector('.calc__output'),
    audio = this.document.querySelector('audio'),
    isOneDot = true;
