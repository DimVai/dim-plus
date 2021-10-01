/* jshint unused:false , strict:global, esversion: 10, evil: true */
"use strict";




//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////               SHORTCUTS              ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


/** 
 * Returns the HTML Element(s) from DOM like jQuery's $.
 * @type {(queryString: string) => HTMLElement[]}  
 */
var Q = (queryString) => {
    return queryString.charAt(0)=='#' ? document.querySelector(queryString) : document.querySelectorAll(queryString);
};

/** 
 * Change the value of a css variable 
 * @type {(variable: string, value: string) => string}  
 */
var setCssProperty = (variable,value) => {document.documentElement.style.setProperty(variable, value); return value};


/* jshint ignore:start */
/**
 * Create variables for every DOM id with the same name. Use only valid javascript variable names in your DOM
 */
var createVariablesFromDOM = function(){
    //document.addEventListener('DOMContentLoaded', ()=>{
        let IdElements = document.querySelectorAll("[id]");
        let MapOfElements = new Map();
        IdElements.forEach(element=> {
            let ElementID = element.id;
            try {
                if (ElementID.includes("-")) {throw error}
                window[ElementID] = element;
                if (window[ElementID]!=element) {throw error}
                MapOfElements.set(ElementID,element);
            } catch(error){
                console.error("createVariablesFromDOM() Error: Can't convert this DOM id to a valid variable name: " + ElementID)
            } 
        });
        return MapOfElements;
    //});
};
/* jshint ignore:end */


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////               LOGGING              ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

/** Variable, not function. Δείχνει αν βρισκόμαστε σε local περιβάλλον */
var isDev = ["localhost","127.0","172.16","10.","192.168."].some((text)=>window.location.hostname.includes(text));

/** Use log instead of console log */
var log = (message) => { if (isDev) {console.log(message);return message;}};

/**
 * Χρήση σε development περιβάλλον. για να ελέγχεις αν λειτουργεί ο κώδικας, πχ αν γίνεται trigger το κλικ κουμπιού.
 * Σε παραγωγικό περιβάλλον, δεν εμφανίζει τίποτα
 * Γράφεις check(); ή check("button clicked"); αντί για console.debug(κάτι)...
 * @param {string} message the message to console.debug 
*/
var check = (message = "check ok") => { if (isDev) {console.debug(message); return message;} };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////               WORKING WITH VARIABLES & TYPES              //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/** Returns the last item of an array */
Array.prototype.last = function() {return this[this.length-1]};

/** Given an array, it returns an array having only unique values */
Array.prototype.unique = function() {return [...new Set(this)]};       //without "...", we get a Set, not an Array

/** Sorts an array of numbers by Numbers */
Array.prototype.sortByNumber = function() {
    var numArray = new Float64Array(this);      //convert to typedArray (so it automatically has a numerical sort)
    return Array.from(numArray.sort());         //create new array from sorted numArray
};

/** Returnes (but not changes) the opposite value of a boolean */
// var toggle = (booleanVariable, defaultValue = false) => {
//     booleanVariable = booleanVariable ?? !defaultValue;     // jshint ignore:line 
//     return !booleanVariable;
//   };

/** Creates an integer generator. How to Use: let nextNumber = intGenerator(1); console.log(nextNumber()); */
let intGenerator = (int=1) => () => int++;      //if no parameter, first number is 1. 


/** isValid(variableAsString) returns true if variable exists and has a valid value, or false if it is null/undefined */
var isValid = variableAsString => {try{return (eval(variableAsString) != null)||false}catch{return false}};

/** Gets a sting with the name of an expression or variable and returns its value if it is valid */
let safeEval = (expressionAsString, valueIfInvalid=false) => {
    try{
        return eval(expressionAsString);
    }catch{return valueIfInvalid}
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////                 EXECUTIONS              /////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// https://codepen.io/dimvai/pen/xxddbNp
// https://codepen.io/dimvai/pen/qBmmRaW


var Dim = {

Executions: {},
lastWord: str => str.split(" ").last(),
// lastWord: str => {
//     let words = str.split(" ");
//     return words[words.length-1];
// },


/** Executes the function only once, even if you call it multiple times 
 *  How to use: executeOnce(updateDiv), executeOnce(notify.bind(this."error"))
*/
executeOnce: func => {
    let functionName = this.lastWord(func.name);   //the last word (bind problems...)
    if (!this.Executions[functionName]) {
        this.Executions[functionName]="true";
      func();
    }
  },

/** Executes the function with minimum interval, even if you call it more often 
 *  How to use: executeSparsely(updateDiv,2000), executeSparsely(notify.bind(this."error"),2000)
 */
executeSparsely: (func, minInterval=1000) => {
    let functionName = this.lastWord(func.name);   //the last word (bind problems...)
    if (!this.Executions[functionName]) {
      func();
      this.Executions[functionName]=true;
      setTimeout(()=> this.Executions[functionName]=false , minInterval);
    }
  },

/** Executes the function only after it has stopped being called for an interval
 *  How to use: executeAfterRapidFire(updateDiv,500), executeAfterRapidFire(notify.bind(this."error"),2000)
 */
executeAfterRapidFire: (func, waitFor=200) => {
    let functionName = this.lastWord(func.name);   //the last word (bind problems...)  
    clearTimeout(this.Executions[functionName]);
    this.Executions[functionName] = setTimeout(func,waitFor);
  },


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////       WATCH VARIABLES FOR CHANGES       /////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/** Watch a variable for changes and executes a function when the variable changes
 * @param {string} variableNameInString - the variable. Use its name in quotes (as a string)
 * @param {function} [callbackFunction] - the callback function. Optional (console.logs the change as default)
 */
watch: (variableNameInString, 
    callbackFunction=()=>{check(variableNameInString+" changed to "+eval(variableNameInString))}) => {
        try{eval(variableNameInString)}catch{console.error(`${variableNameInString} not initialized in Dim.watch`);return}
        window["watch_"+variableNameInString] = eval(variableNameInString);
        setInterval(()=>{
            if (eval(variableNameInString) != window["watch_"+variableNameInString]) {
                window["watch_"+variableNameInString] = eval(variableNameInString);
                callbackFunction();
            }
        },200);
},

/** Use this method, instead let or var, in order to declare a variable that is watched for changes
 * @param {string} variableName - the variable name. Use its name in quotes (as a string)
 * @param {any} variableValue - the initial variable's value. Optional (default value is null)
 * @param {function} [callbackFunction] - the callback function. Optional (console.logs as default)
 */
declareWatchedVariable: function(variableName, variableValue=null, 
    callbackFunction=()=>{check(variableName+" changed to "+eval(variableName))}) {
        //just for error checking
        if ( isValid(variableName) ) {
            console.error(`declareWatchedVariable error: 
            Variable ${variableName} is already declared. 
            Use Dim.declareWatchedVariable(${variableName},${variableValue}) instead of var or let`);
            return;
        } //end of error checking
        //and finally the actual useful code!
        Object.defineProperty(window, variableName, {
            set: function(value) {window["_"+variableName] = value; callbackFunction()},
            get: function(x) { return window["_"+variableName]}
        });
        window[variableName]=variableValue;
},


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////               RELOADING & GET PARAMETERS            //////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Refresh/Reload of current page. 
 * @param {boolean} [keepGetParameters] - Optional. If true, then keeps the get parameters. Default=false
 */
 refreshWindow: (keepGetParameters = true) => {
    if (keepGetParameters){
        window.location.reload();
    } else {
        location.replace(window.location.origin + window.location.pathname);
    }
  },

/**
 * Returns an Object with the current URL's GET parameters in key-value format
 * https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
* @type {{}} Object with key values 
 */
GetParameters: () => {
    var urlParams;
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (!!(match = search.exec(query)))          // = ανάθεση όχι ισότητα,
        {urlParams[decode(match[1])] = decode(match[2])}
    return urlParams;
},





//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////               LOADING THINGS            /////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Φορτώνει τις εικόνες οι οποίες στην html δηλώνονται έτσι: 
// <img data-lazy="#" src="#" data-src="url-εικόνας">  ή  <img src="προσωρινή-ελαφριά-εικόνα" data-src="μόνιμη-εικόνα">
//απαιτεί να έχει φορτωθεί το jQuery πρώτα
//απαιτεί και css:   img[data-src][data-lazy="#"]{opacity: 0;}
//Αν δεν οριστεί παράμετρος καθυστέρησης, τότε φορτώνει τις εικόνες σε 1 sec. 
//έχει νόημα μόνο όταν οι εικόνες έχουν σταθερό μέγεθος. 

/**
 * Loads images after a while. Needs appropriate CSS. Use fixed image sizes.
 * @param {number} delay Delay in seconds
 */
LazyLoadImages: (delay=1) => {
	setTimeout(() => {
            $('img').each(function(){
                $(this).attr('src', $(this).attr('data-src'));
            });
            setTimeout(()=>{$('[data-src]').fadeTo(500, 1)},200);			//το fadeTo ελέγχει το opacity        
    }, delay*1000);
},

/**
 * Loads a .CSS or .JS file. Needs JQuery 
 * @param {URL} resourceURL Path of .js or .css file
 * @param {number} delay Delay in seconds. Optinal. Default=0 
 */
LazyLoadResource: (resourceURL, delay = 3) => {
    let resourceExtention = resourceURL.split('.').pop();       //CSS or JS?
    setTimeout(() => {
        switch (resourceExtention) {
            case 'css':
                $("head").append($(`<link rel='stylesheet' href=${resourceURL} type='text/css' media='screen' />`));    
                break;
            case 'js':
                $.getScript(resourceURL);
                break;
            default:
                break;
        }
    }, delay*1000);
},


//φόρτωση στοιχείου στην σελίδα όπως jQuery.load. πχ  load(document.getElementById('app-header-container'), '../pages/header.html');
/**
 * jQuery.load alternative
 * @param {HTMLElement} target div element
 * @param {URL} url html to be loaded in div
 */
load: (target, url) => {
    var r = new XMLHttpRequest();
    r.open("GET", url, true);
    r.onreadystatechange = function () {
        if (r.readyState != 4 || r.status != 200) {return;}
        target.innerHTML = r.responseText;
    };
    r.send();
},



};
//end of Public Object 




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////                EXECUTE MULTIPLE TIMES            /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * Execute a function multiple times. 
 * https://stackoverflow.com/questions/21648264/javascript-call-function-10-times-with-1-second-between/21648331 
 * @param {function} func the function to be executed (without parenthesis / use bind)
 * @param {number} num how many times to be executed
 * @param {number} interval time interval between executions in milliseconds
 * @param {function} [finallyExecute] Optinal. Another function to be executed in the end 
 * @returns {void} 
 */
 var setIntervalFiniteTimes = (func, interval, num, finallyExecute = ()=>{}) => {
    if (!num) {finallyExecute();return}                 
    func();
    setTimeout(function() { this.setIntervalFiniteTimes(func, interval, num - 1, finallyExecute) }, interval);
};




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////                DELAYING EXECUTIONS            /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * Χρησιμοποιείται σε async functions σε εντολή τύπου ' await delay(2000); ' ώστε να περιμένει 2 sec πριν την επόμενη εντολή 
 * https://gist.github.com/eteeselink/81314282c95cd692ea1d
 * @param {number} pauseInterval time in milliseconds
 * @returns {Promise} 
 */
const delay = pauseInterval => new Promise(resolve => setTimeout(resolve, pauseInterval));

/** Passing a variable as an Object return its name */
const varName = varAsObject => Object.keys(varAsObject)[0];

/** Evaluates a variable, function, or string condition. Returns a boolean */
const checkFor = condition => {
    if (typeof condition === 'function'){
        if (condition()) {return true}           //Όχι: return condition(). Δεν θέλω να επιστρέφει την condition ως συνάρτηση.  
    } else if (typeof(condition) === 'object') {
        if (eval(varName(condition))) {return true}
    } else {
        try {return eval(condition)}catch{throw "Condition is not valid";} 
    }
    return false;      //if everything fails
};



// Συναρτήσεις αναμονής. Όταν ισχύσει μια συνθήκη, εκτέλεσε τη συνάρτηση τάδε. //
// https://stackoverflow.com/questions/22125865/wait-until-flag-true

// Πρώτος τρόπος. Παραλλαγή της setTimeout
// όπως ξέρουμε, οι συναρτήσεις παίρνουν ορίσματα είτε μεταβλητές, είτε συναρτήσεις
// όχι μεταβλητές, όχι συνθήκες, ούτε εκφράσεις! πχ όχι  size=='big' , αλλά  () => size == 'big'  !!!
// Πλέον παίρνει και συνθήκες και εκφράσεις σε string. πχ 'size=="big"'
// χρήση: setTimeoutUntil(() => window.waitForMe, () => console.log('got you'))
// δεν έχει τεσταριστεί αν η callback λειτουργεί με arguments... 
/**
 * Wait for a condition to be met and, only then, execute a function 
 * @param {any} condition Use a variable or a function (that returnes true/false). Do not use condition or expression!
 * @param {Function} callback Function to call when condition is met
 * @param {number} checkInterval Check condition every this interval in milliseconds. 
 */
const setTimeoutUntil = (condition, callback, checkInterval = 200) => {
    let executeNow = checkFor(condition);
    if(!executeNow) {
        setTimeout(setTimeoutUntil.bind(null, condition, callback), checkInterval); /* this checks the flag every 200 milliseconds*/
    } else {
        callback();
    }
};

// Δεύτερος τρόπος. Χρήση await εντολής μέσα σε async συνάρτηση. Κάνουμε async την "μαμά" function.  
// Εδώ ορίζουμε τη συνθήκη που πρέπει να ισχύει ώστε να συνεχίσει η εκτέλεση της κύριας μαμάς function 
// Χρήση στη μαμά: await until(_ => flag == true);

/**
 * Wait for a condition to be met and, only then, continue execution of function. 
 * Use only inside async function!  
 * Use this way: await until(_ => flag == true);
 * @param {boolean|Function} condition Use a variable or a function (that returnes true/false). Do not use condition or expression!
 * @returns {Promise} 
 */
var until = condition => {
    const poll = resolve => {
      let resolveNow = checkFor(condition);
      if (resolveNow) {resolve()}
      else {setTimeout(_ => poll(resolve), 200)}
    };
    return new Promise(poll);
  };



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////                COOKIES            /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  

//Cookie Handling    -   Δεν έχουν τεσταριστεί~
//Δουλεύουν με ασφάλεια με τιμές (value) strings. Με περίεργους χαρακτήρες (πχ semicolons ή =), δεν δουλεύει
//https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript
//Για πιο συστηματική δουλειά, χρησιμοποίησε αυτό: https://github.com/js-cookie/js-cookie
/**
 * Sets a cookie
 * @param {string} name 
 * @param {string} value 
 * @param {number} days 
 */
function setCookie(name, value, days =30) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
/**
 * Gets a cookie 
 * @param {string} name 
 * @returns {string} cookie value
 */
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {c = c.substring(1,c.length)}
        if (c.indexOf(nameEQ) == 0) {return c.substring(nameEQ.length,c.length)}
    }
    return null;
}
/**
 * Erases a cookie 
 * @param {string} name 
 * @returns 
 */
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

