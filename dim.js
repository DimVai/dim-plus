/* jshint unused:false , strict:global, esversion: 10, evil: true */
"use strict";




//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////          SELECTORS - VARIABLES         ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


/** 
 * Returns the HTML Element(s) from DOM like jQuery's $.
 * @type {(queryString: string) => HTMLElement[]}  
 */
let Q = (selector) => {
 
    let dimQuery = 'dimQuery';
    if ([document,window].includes(selector) || selector.charAt(0)=='#') {      //if selector is only one item
      
        let element = [document,window].includes(selector)?selector:document.querySelector(selector);     
      
        if (element.hasOwnProperty(dimQuery)){          //already OK
            return element;
        } else {

           if (![document,window].includes(selector)){
      
              element.hide ??= function(){element.style.display="none";return element}          // jshint ignore:line
              element.show ??= function(){element.style.display="revert";return element}        // jshint ignore:line
              element.addClass ??= function(className){element.classList.add(className);return element}     // jshint ignore:line
              element.removeClass ??= function(className){element.classList.remove(className);return element}   // jshint ignore:line
              element.toggleClass ??= function(className){element.classList.toggle(className);return element}   // jshint ignore:line

              element.set ??= function(content,html=false) // jshint ignore:line
                  {html?element.innerHTML=content:element.textContent=content;return element}       // jshint ignore:line

              element.fetch ??= function(URL,pathFunction){return fetch(URL)       /* jshint ignore:line  */  //return, so user can use "then" 
                .then(response=>{try{return response.json()}catch{return response.text()}})
                .then(data=>element.set(pathFunction?pathFunction(data):data))} // jshint ignore:line
              element.post ??= function(URL,parameterName){return fetch(URL,         /* jshint ignore:line  */
                  {method:'POST', 
                   headers:{'Content-Type':'application/json'}, 
                   body:JSON.stringify({[parameterName]:element.value}) // jshint ignore:line
                  })}
             
              element.onClick ??= function(callback){element.addEventListener('click',callback);return element}     /* jshint ignore:line  */
              //no "click", so you can simulate click with el.click(), or else, infinite loop! 
              element.onInputChange ??= function(callback){element.addEventListener('input',callback);return element}    /* jshint ignore:line  */
                                                         
          } //end of document/window if 
              element.on ??= function(event,callback){element.addEventListener(event,callback);return element}   /* jshint ignore:line  */
              element.onKeyboard ??= function(callback){element.addEventListener("keydown",function(keyEvent){   /* jshint ignore:line  */
                callback.call(element,keyEvent,KeyString(keyEvent));        /* jshint ignore:line  */
                return element;
              //not simply: callback(KeyString(keyEvent)). so the user can have access to "this" element. 
            })}

            element[dimQuery] = true;
            return element;
            }

    } else {            //user selects class or NodeList
      
        let selectorProxy = selector.replaceAll(' ','_');
        if (window.hasOwnProperty(selectorProxy)) { 
            return window[selectorProxy];
        }
        else {
            let elements = document.querySelectorAll(selector);
            elements.nodeList = elements.itself = elements;
            elements.hide ??= function(){elements.forEach(el=>el.style.display="none");return elements}      /* jshint ignore:line  */
            elements.show ??= function(){elements.forEach(el=>el.style.display="revert");return elements}    /* jshint ignore:line  */
            elements.addClass ??= function(className){elements.forEach(el=>el.classList.add(className));return elements}     /* jshint ignore:line  */
            elements.removeClass ??= function(className){elements.forEach(el=>el.classList.remove(className));return elements}   /* jshint ignore:line  */
            elements.toggleClass ??= function(className){elements.forEach(el=>el.classList.toggle(className));return elements}   /* jshint ignore:line  */
            elements.on ??= function(event,callback){elements.forEach(el=>el.addEventListener(event,callback));return elements}  /* jshint ignore:line  */
            elements.set ??= function(content,html=false){html?elements.forEach(el=>el.innerHTML=content):elements.forEach(el=>el.textContent=content);return elements}  /* jshint ignore:line  */

            //1. for functions, map,forEach
            elements.map = function(func){return [...elements].map(func)};

            //2. proxy for properties => refer to its children if nodeList does not have this property 
            let propertyProxy = new Proxy(elements, {
              get(o,property){
                  if (property in o) {return o[property]}     //όχι o.hasOwnProperty(property) διότι δεν κοιτάει proto, px length
                  else { return o.map(el=>el[property]??el.getAttribute(property)) }     /* jshint ignore:line  */
              },
              set(o,property,value){
                  if (property in o) {o[property]=value} //if nodeList property
                  else { o.forEach(el=>{
                      if(el.hasOwnProperty(property)){el[property]=value}else{el.setAttribute(property,value)}
                  })}
                  return value;
              },
            });

            //3. proxy for methods => refer to its children
            elements.each = new Proxy(elements, {
              get(o, method) {        //(περιλαμβάνει πχ το getAttribute και το setAttribute//
                return function() { return o.map(el=>el[method].apply(el,arguments)) }; 
                //return method στην ουσία, και μέσα πάλι return και map αντί για foreach
                //γιατί κάποιες επιστρέφουν και κάποιες θέτουν πχ getAttribute, setAttribute
              }
            });

            window[selectorProxy] = propertyProxy;
            return propertyProxy;
            }
    }

};



/**
 * Create variables for every DOM id with the same name. Use only valid javascript variable names in your DOM
 */ /*
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
*/


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

/** Convertes something to a number */
let numberOf = whatever => isNaN(whatever) ? 0 : (whatever||0);

/** sum of an array of numebers  */
Array.prototype.sum = function(){
    let Sum = 0;
    this.forEach(value => {Sum += +numberOf(value)});
    return Sum;
  };

/** string.test(regexp|string) has the same functionality as regexp.test(string). */
String.prototype.test = function(reg) {return (reg instanceof RegExp) ? reg.test(this) : this.includes(reg)};

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


let KeyString = (keyEvent) => {
    //key = last button pressed. Eg Ctrl+Shift+Z=>Z, Ctrl+Shift=>Shift
    let key = keyEvent.key.replace("Control", "Ctrl");  //keyEvent.key. But replace Control with Ctrl
    if (!keyEvent.ctrlKey && !keyEvent.altKey) {return key}   //if no Ctrl or Alt is pressed. Shift+a=>A, σ=>σ
  
    // so, Ctrl or Alt is pressed. code is the hardware button id (not the letter)
    if (key.length==1) {key=keyEvent.code.replace('Key','')}     //if letter (not 'Home' or 'Escape'). Ctrl+R instead of Ctrl+r,Ctrl+ρ, 
    let pre = '';
    if (keyEvent.altKey && key!="Alt") {pre+='Alt+'}        //if Alt was pressed from before but not this (the last) one
    if (keyEvent.ctrlKey && key!="Ctrl") {pre+='Ctrl+'}    //user can press alt+ctrl+shift+d
    if (keyEvent.shiftKey && key!="Shift") {pre+='Shift+'}    //[Ctrl,Alt]+Shift+κάτι
    return pre+key;
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
/*
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
},*/



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////               NAVIGATION & GET PARAMETERS            //////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * Old Code
 * Returns an Object with the current URL's GET parameters in key-value format
 * https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
* @type {{}} Object with key values 
 */
/*
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
*/

/** Dim.Nav is a set of methods for easy window/URL manipulation 
 * It has METHODS, not vairables, so it it is UPDATED with the current (updated) parameters when client routing.
*/
Nav: {

    // jshint ignore:start
    /** 
     * Returns the URL's GET parameter. If parameter not defined, it returnes all parameters in a key-value object.
     */
    GetParameters: (parameter=null) => parameter 
        ? Object.fromEntries(new URLSearchParams(window.location.search).entries())[parameter] ?? null  
        : Object.fromEntries(new URLSearchParams(window.location.search).entries()),
    // jshint ignore:end 

    /**
     * Refresh/Reload of current page. 
     * @param {boolean} [keepGetParameters] - Optional. If true, then keeps the get parameters. Default=false
     */
    RefreshWindow: (keepGetParameters = true) => {
        if (keepGetParameters){
            window.location.reload();
        } else {
            location.replace(window.location.origin + window.location.pathname);
        }
    },

    URL: () => window.location.href,
    domain: () => window.location.hostname,
    path: () => window.location.pathname,

    /** 
     * Changes URL in the URL bar, so a new item is also created in browser's history 
     * Then, use window.onpopstate to tell the browser what to do when the uses presses back or forward 
    */
    CreateNewState: (localPath) =>{
        history.pushState({},"",localPath);
    },

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
 * @param {number} delay Delay in seconds. Optional. Default=3 
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





//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////          REGEXP UTILITIES          //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let RegularExpression = {

    regWords : (input) => {
        return Array.isArray(input) ? input.join('|') : input;
      },

    Everything() {return new RegExp('.*')},
    Contains(array) {return new RegExp('.*('+this.regWords(array)+').*')},
    ContainsNot(array) {return new RegExp('^(?!.*('+this.regWords(array)+')).*')},
    StartsWith(array) {return new RegExp('^('+this.regWords(array)+').*')}, 
    StartsWithNot(array) {return new RegExp('^(?!'+this.regWords(array)+').*')}, 
    EndsWith(array) {return new RegExp('.*('+this.regWords(array)+')$')}, 
    EndsWithNot (array) {return new RegExp('.*(?<!'+this.regWords(array)+')$')}, 
    ContainsWhileDoesNotContain: function(containsArray, doesNotContainArray=null) {
        return (doesNotContainArray==null) 
            ? this.Contains(containsArray) 
            : new RegExp( '^(?!.*('+this.regWords(doesNotContainArray)+')).*('+this.regWords(containsArray)+').*$' )},
};



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////          WATCHED VARIABLE          //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/** 
 * Create a watched variable this way instead of let/var: 
 * new WatchedVariable(variableName,initialValue,callbackFunction)
 * Example: https://codepen.io/dimvai/pen/QWgXmdY
 */
/*
class WatchedVariable {
    /**
     * @param {string} variableName
     * @param {any} initialValue
     * @param {Function} callbackFunction
     *//*
    constructor(variableName,initialValue,callbackFunction){
        //set default values if missing
        initialValue ??= null;   //jshint ignore:line //
        callbackFunction ??= function(){console.log(variableName+" changed to " + window[variableName])};  //jshint ignore:line //
        //and now the actual useful code!
        Object.defineProperty(window, variableName, {
            set: function(value) {window["_"+variableName] = value||null; callbackFunction()},
            get: function() {return window["_"+variableName]}
        });
        window[variableName]=initialValue;
        Object.assign(this, {variableName,initialValue,callbackFunction});
    }
}*/


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
        if (condition()) {return true}           //Όχι: return condition(). Δεν θέλω να επιστρέφει την condition / αποτέλεσμα/συνάρτησης.  
    } else if (typeof(condition) === 'object') {
        if (eval(varName(condition))) {return true}
    } else {
        try {return eval(condition)}catch{throw "Condition is not valid";}  //κι εδώ όμως θέλει με την ίδια λογική
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


/**
 * ALL FUNCTIONS:
 * 
 * Q(queryString)
 * createVariablesFromDOM()  //deprecated
 * 
 * isDev // variable (not function)
 * log
 * check
 * 
 * Array.prototype.last
 * Array.prototype.unique
 * Array.prototype.sortByNumber
 * numberOf     // convert to number
 * Array.prototype.sum
 * String.prototype.test        //for RegExp
 * 
 * intGenerator
 * isValid(variableAsString)
 * safeEval(expressionAsString, valueIfInvalid=false)
 * KeyString(keyEvent)
 * 
 * Dim.Executions
 * Dim.lastWord
 * Dim.executeOnce
 * Dim.executeSparsely
 * Dim.executeAfterRapidFire
 * Dim.watch(variableNameInString,callbackFunction)
 * Dim.declareWatchedVariable(variableName, variableValue=null,callbackFunction)    //deprecated
 * Dim.LazyLoadImages(delay=1)
 * Dim.LazyLoadResource(resourceURL, delay = 3)
 * Dim.load(target, url)
 * 
 * Dim.Nav.GetParameters()
 * Dim.Nav.CreateNewState()
 * Dim.Nav.RefreshWindow(keepGetParameters=true)
 * Dim.Nav.URL()
 * Dim.Nav.path()
 * Dim.Nav.domain()
 * 
 * RegularExpression{Contains,StartsWith,EndsWith}
 * 
 * new WatchedVariable(variableName,initialValue,callbackFunction)       //deprecated
 * setIntervalFiniteTimes(func, interval, num, finallyExecute = ()=>{})
 * delay(pauseInterval)
 * varName(varAsObject)
 * checkFor(condition)
 * setTimeoutUntil(condition, callback, checkInterval = 200)
 * until(condition)
 * setCookie,getCookie,eraseCookie
 * 
 * 
 */
