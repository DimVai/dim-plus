// jshint ignore: start


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////                FUNCTIONS                /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var setIntervalFiniteTimes = (func, interval, num, finallyExecute = ()=>{}) => {
    if (!num) {finallyExecute();return}                 
    func();
    setTimeout(function() { setIntervalFiniteTimes(func, interval, num - 1, finallyExecute) }, interval);
};

let Dim = {};
Dim.checkFor = condition => {
    if (typeof condition === 'function'){
        if (condition()) {return true}           
        //Όχι: return condition(). Δεν θέλω να επιστρέφει την condition / αποτέλεσμα/συνάρτησης.  
    } else if (typeof(condition) === 'object') {
        /** Passing a variable as an Object return its name */
        const varName = varAsObject => Object.keys(varAsObject)[0];
        if (eval(varName(condition))) {return true}
    } else {
        try {return eval(condition)}catch{throw "Condition is not valid"}  //κι εδώ όμως θέλει με την ίδια λογική
    }
    return false;      //if everything fails
};

var until = condition => {
    const poll = resolve => {      
      if (Dim.checkFor(condition)) {resolve()}
      else {setTimeout(_=>poll(resolve), 200)}
    };
    return new Promise(poll);
};

const setTimeoutUntil = (condition, callback, checkInterval = 200) => {
    let executeNow = Dim.checkFor(condition);
    if(!executeNow) {
        setTimeout(()=>setTimeoutUntil(condition, callback, checkInterval)); /* this checks the flag every 200 milliseconds*/
    } else {
        callback();
    }
};



/** Simulate Typing 
 * @type {(placeID: HTMLElement, text:String, interval, nextFunction: any)=> void}
*/
/*
function SimulateTyping(placeID, text, interval, nextFunction){
    var i=0;
    var timer = setInterval(function(){
        document.getElementById(placeID).value += text.charAt(i++);
            if(i==text.length){
                clearInterval(timer);
                nextFunction();
                //nextFunction;
            }
    },interval);
    }
  */  
    
    
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////                TESTING                /////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
    
    let number = 0;
    // log(varName({test}));
    let myCondition = () => (number==1);
    // setTimeoutUntil(myCondition,()=>log("success!!!"));             //works
    // setTimeoutUntil(myCondition(),()=>log("success!!!"));       //doesn't work
    // setTimeoutUntil('number',()=>log("success!!!"));              //works
    // setTimeoutUntil(number,()=>log("success!!!"));         //doesn't work
    // setTimeoutUntil('number==1',()=>log("success!"));         //works
    // setTimeoutUntil({number},()=>log("success!"));         //works
    
    
    setIntervalFiniteTimes(()=> {number++;console.log(number)},1000,6);
    
    let testingUntil = async () => {
        await until ('number==3');           //works
        // await until (number==10);           //does not work
        // await until (number);      //doesn't work 
        // await until ('number');          //works
        // await until ({number});          //works
        // await until (myCondition);          //works
        console.log("until success!");
    };
    testingUntil();

    setTimeoutUntil('number==4',()=>console.log('setTimeoutUntil success!'));
    
    
    // let surname = 'Johnes';
    // log(safeEval('surname'));                 // 'Johnes'
    // log(safeEval('surName'));                 // false
    // log(safeEval('surName','no surname'));    // 'no surname'
    
    
    