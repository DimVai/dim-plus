/* jshint unused:false , strict:false, esversion: 10, evil: true */
/* jshint ignore:start */
"use strict";

//createVariablesFromDOM();


//var a=1;
//window.a = a;
//window.myVar = myVar;

var declareWatchedVariable = function(variableName, variableValue=null, callbackFunction=null) {
    //just for error checking
    let isValid = variableAsString => {try{return (eval(variableAsString) != null)||false}catch{return false}};
    if ( isValid(variableName) ) {
        console.error(`declareWatchedVariable error: 
        Variable ${variableName} is already declared. 
        Use declareWatchedVariable(${variableName},${variableValue}) instead of var or let`);
        return;
    } //end of error checking
    //set default callback if missing
    callbackFunction ??= function(){console.log(variableName+" changed to " + window["_"+variableName])};
    //and finally the actual useful code!
    Object.defineProperty(window, variableName, {
        set: function(value) {window["_"+variableName] = value; callbackFunction()},
        get: function() { return window["_"+variableName]}
    });
    window[variableName]=variableValue;
};

//var myVar = 13;  //uncomment this to test for errors
//let myVar = 0;  //uncomment this to test for errors
new WatchedVariable('myVar', 12);       //instead of:   var myVar = 12 ;
myVar = 21;
myVar++;
myVar = 21;
myVar++;

//new WatchedVariable('myVar', 12); //uncomment for testing

let WatchedObject =  new WatchedVariable('mySecondVar', 0, ()=>console.log("mySecondVar changed"));
mySecondVar++;
console.log(WatchedObject);




/*
//λειτουργεί μόνο όταν έχεις δηλώσει μεταβλητή χωρίς var και χωρίς let, πχ myThirdVariable = 21 το οποίο είναι κακό και θέλει όχι use strict
var watchVariable = function(variableName, callbackFunction=null) {
    callbackFunction ??= function(){console.log(variableName+" changed to " + window["_"+variableName])};
    Object.defineProperty(window, variableName, {
        set: function(value) {window["_"+variableName] = value; callbackFunction()},
        get: function(x) { return window["_"+variableName]}
    });
};

//λειτουργεί χωρίς use strict αλλά μην το κάνεις έτσι!
myThirdVariable = 21;
watchVariable('myThirdVariable');
*/




var testVar = 12;   //comment this to test
var watch = (variableNameInString, callbackFunction=null) => {
    try{eval(variableNameInString)}catch{console.error(`${variableNameInString} not initialized in watch`);return}
    callbackFunction ??= ()=>{console.log(variableNameInString + " changed to " + eval(variableNameInString))}
    window["watch_"+variableNameInString] = eval(variableNameInString);
    setInterval(()=>{
        if (eval(variableNameInString) != window["watch_"+variableNameInString]) {
            window["watch_"+variableNameInString] = eval(variableNameInString);
            callbackFunction();
        }
    },200);
};

//Dim.watch('testVar');
watch('testVar');
testVar = 13;