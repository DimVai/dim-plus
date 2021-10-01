


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////                VARIOUS                /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







/** Simulate Typing 
 * @type {(placeID: HTMLElement, text:String, interval, nextFunction: any)=> void}
*/
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
    
    
    
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////                testing                /////////////////////////////////////////////
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
    
    
    setTimeout(()=> {number++},1500);
    
    let testingUntil = async () => {
        // await until ('number==10');           //works
        // await until (number==10);           //does not work
        // await until (number);      //doesn't work 
        // await until ('number');          //works
        // await until ({number});          //works
        // await until (myCondition);          //works
        // log("until success!");
    };
    testingUntil();
    
    
    // let surname = 'Johnes';
    // log(safeEval('surname'));                 // 'Johnes'
    // log(safeEval('surName'));                 // false
    // log(safeEval('surName','no surname'));    // 'no surname'
    
    
    