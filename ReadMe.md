## My personal CSS/JS Add-ins (Helpers) I use when I code
Feel free to steal my code!

# **dim-structure.css**

CSS Classes.

Note that everything uses the default Bootstrap breakpoints:
```CSS
	--xxs: 288px;
	--xs: 384px;
	--sm: 576px;
	--md: 768px;
	--lg: 992px;
	--xl: 1200px;
	--xxl: 1400px;
```

<hr>

## **Slim containers**

```CSS
xxs
sx
sm 
md 
lg
```

Set max-width for divs, using one of these classes

<hr>

## **Drop-down (menus)**
Use a parent div that contains two things: the trigger-button and the drop-down menu. 

Set the parent as one of the following:

```CSS
OpenChildrenOnClick
OpenChildrenOnHover
```

And the drop down area:

```CSS
DropdownArea
```

Note 1. The trigger-button does not need a class.

Note 2. If you want the trigger-button to remain "hovered" when you hover the drop down area, add manually in your css:
`.DropdownArea:hover .trigger-btn { [hovered btn style] }`

<hr>

## **Centering things**

```CSS
center
```

Centers an image or a text. 


Although the above class does its job most of the time, mainly in text or pictures, the **recommended** way to center **everything** is to add the appropriate class to the **parent**:

```CSS
center-contents
center-contents-top
```

Centers one or more children horizontally. If there are more than one, they will be stacked one below the other. If the container has more height, the first class will also center it/them vertically. 

You can place more than one "things" inside, and they will all be centered. *Note*: if it is a text paragraph, the class will "position" it to the center, not "align" it.

## **Placing items in the same line**

```CSS
inline-contents
inline-contents-top
```

Places children, all in the **same line**. The first class centers them all vertically also.  

Finally, these inline cases are **responsive** using the `md` and `lg` breakpoints, meaning that they are not inline in smaller devices:

```css
inline-contents-md
inline-contents-lg  
inline-contents-top-md
inline-contents-top-lg
```
<hr>

## **Standard inline structures**

Use the standard inline structure for easy inline alignment of children (for example in the header with a navigation bar):
```css
standard-inline-3   /*left-center-right*/
standard-inline-2   /*left-right*/
```
These can contain 2 or 3 (`div` or anything) children, where the first child is placed on the left and the last on the right. The middle child (in the `-3` class) is centered.

These classes are **not responsive**. Maybe in the next version. 

The **difference** using `flex` or a simple `grid` to implement these, is that those cases break where the children have weird sizes (i.e. some are very large and others are very small...)
<hr>

## **Equal Columns**

```CSS
equal-columns
```

Use this in order to have arbitrary number of children-columns (`div` or anything) with equal widths.

This is responsive with the `md` and `lg`:
```CSS
equal-columns-md 
equal-columns-lg   
```

<hr>

## **Paragraph text to columns**

```CSS
columns
```

This class splits a text/paragraph to columns, using the standard widths recommended for easier reading (that's why it is not customizable).


<hr>

## **Gallery of pictures**

This is a very difficult task that gets done easily. The classes are:
```css
gallery-grid 
gallery-flex  
```
They have their children (divs or images) in a nice responsive grid.

These have a few differences (mainly in the maximum sizes of the children and in the alignment of the last row). **Try both** and then decide.

Use divs or pictures or anything as children.

How to use. In the parent HTML use:

```HTML
	<div class="gallery-grid my-2" 
         style="--galleryItemMinWidth: 300px;
                --galleryItemMaxWidth: 600px; 
                --galleryItemsGap: 2vw"
        >
        (children divs or images)
	</div>
```
The `style` attribute with the parameters is optional. 

(For `gallery-flex`, use `gallery-flex` in the above HTML snippet instead of `gallery-grid`. The style attribute is the same and it is optional.)


<hr>


## **Scrolling**

```CSS
scrollable
```

**No scrollbars**, but keeping the ability to scroll with the mouse scroll wheel.

```CSS
no-scrollable
```

**No-scrollbars** and **no ability to scroll** even with mouse scroll wheel.

```CSS
scrollable-bars
```

Adds scrollbars and the ability to scroll if for some reason they do not exist.







<hr>
<hr>


## **CSS Classes with no documentation or support**

```CSS
unseparated
```
Use in a `span`. The text inside this span will be in a single line (no wrapping) if it can fit in page's width. 

```CSS
sticky
```
Stick something to top, when scroll by.

CSS for Lazy images. In the HTML set:
```HTML
<img src="nothing-or-small-pic" data-src="real-img-source" data-lazy="#">
```

Dark mode:

```CSS
darkable
noDark
```
Add one of theses classes according to your needs. Then, when you want to toggle dark mode, add (with JavaScript) the class `dark-mode` (everywhere or where you want). 


<hr>
<hr>
<hr>
<hr>

# **dim.js**



## **Selecting HTML Elements with the Q selector**


### `Q(queryString)`

### **General description**

Use `Q` to select HTML Elements. It is used similarly to `$(elements)` in `jQuery`. However, it returns DOM elements, not jQuery elements, and it replaces the long functions `document.querySelectorAll(elements)` and `document.querySelector(element)`. If the parameter is an `#id` then `Q` returns the HTML element with this id (or returns null). Else, (if it is an element name (like `p` or `li`), a `.class` or something other), then it returns a (possibly empty) array containing the selected HTML Elements. Special case is the `~` selector. Examples:
```JavaScript
Q('#send')      //returns the element with id "send"

Q('p')          //returns an array of all p elements 
Q('.btn')       //returns an array of all elements with class "btn"
Q('[href="/app"]')   //returns all elements with href attribute "/app"

//returns an array with all elements which have: data-variable="author"
Q('~author')    // = Q('[data-variable="author"]')
```

### **Selectors by `ID`**

In the case of an `#id` (single element), you can also use the following **additional** methods that are now available:
```JavaScript
/***  Display and CSS  ***/
Q('#message').hide()                       //hides the element (display none)
Q('#message').show()                       //shows the element if hidden (display revert)
// toggles a class to an element by checking a condition (can be true or false)
Q('#message').toggleClass('className',condition)       

// replaces the text (textContent) of an element
Q('#message').set(text)            
// when 'html', it replaces the innerHTML of an element          
Q('#message').set(richText,'html')           

/***  Sending and getting data ***/
// Makes a GET request from a URL, and then replaces 
// the text of `#textFromOuside` with the GET response. 
Q('#textFromOuside').fetch(URL)                     
// If the result is an object (and not a singe value/text), 
// you must specify the second argument (pathFunction) as a funtion of this object:
Q('#textFromOuside').fetch(URL,resObj=>resObj.specificProperty)
// Sends a POST request to URL sending an object with the value of #textArea. 
// The data is sent in the format: {parameterName:valueOfInput}
Q('#textArea').post(URL,parameterName)         

/***  Event listeners  ***/
Q('#menuItem').on(event,callback)                   //on=addEventlistener
Q('#menuItem').onClick(callback)                    //addEventlistener('click',...
Q('#menuItem').onInputChange(callback)              //addEventlistener('input,...
// onkeydown using the special keyString variable (see later). Example:
Q('#menuItem').onKeyboard(function(keyEvent,keyString){
    if (keyString="Ctrl+S") {/*save the item to database*/}
})
```

In the case of `Q(window)` or `Q(document)`, only `on` and `onKeyboard` are added to its standard methods. 

### **Selectors by `Class` or `general` selectors**

In the case of an element name (like `p` or `li`), a `.class` or `[data-attribute="something"]`, the result is an array. Besides all array methods, you can use the following **additional** methods:

```JavaScript
/***  Display and CSS   ***/
Q('.symbols').hide()                      //hides all elements (display none)
Q('.symbols').show()                      //shows all elements if hidden (display revert)
Q('.alerts').toggleClass('className',condition)     //toggles a class to all elements 

// shows all elements that fulfil the filterFunction and hides the rest 
Q('.buttonsArea button').displayFilter(filterFunction)     

// replaces the text (textContent) of all elements
Q('.className').set(text)            
// when 'html', it replaces the innerHTML of all elements          
Q('.className').set(richText,'html')           

// on=eventlistener on all elements
Q('.menuItem').on(event,callback)   


// DO SOMETHING TO ALL ELEMENTS OF NODELIST:

//  1. For custom functions on all elements  -  Use map or forEach as usual. 
Q('.mainParagraph').map(parapraph=>firstWord(paragraph))         

//  2. For single properties  -  Just use the property!
Q('.mainParagraph').title                   //an array of the titles of all elements!
Q('.mainParagraph').firstChild              //an array of the firstChilds(!) of all elements!
Q('.mainParagraph').outerHTML = `some html`    //sets all elements' outerHTML!
// this does not work with nested properties:
Q('.mainParagraph').firstChild.innerHTML        //error! Use map instead... 

//  3. For methods  -  Use .each
// get an array of the data-someAttr of all elements!
Q('.someClass').each.getAttribute('data-someAttr')  
// change or set the data-someAttr of all elements! 
Q('.someClass').each.setAttribute('data-someAttr','new value')
```

### **Selectors by JavaScript Variable using the `~` selector**

Finally, a useful feature is when you want to change the text of some elements when a variable changes. In that case in the `HTML` you must have an element with `data-variable="variableName"`:
```HTML
<p>Your name is <span data-variable="username">guest</span> and you can read below.</p>
```
You can select and change all these elements simply with:
```JavaScript
//change the textContent of all elements with [data-variable="username"] to "George" if logged-in:
Q('~username').set("George")    
```
Otherwise, you had to do `document.querySelectorAll('[data-variable="username"]').forEach(el=>el.textContent="George")`!!!

<hr>



## **Logging to console only in development environment**
### **Console log/debug only in local/dev**
```JavaScript
log("message")          // console.log("message"), only in local/dev 
check()                 // console.debug("check ok"), only in local/dev 
check("button pressed") // console.debug("button pressed"), only in local/dev
```

Use these to output something to console, but only in your development enviroment. So, use `log(message)`, instead of `console.log(message)` and `check(message)` instead of `console.debug(message)`. In `check`, the message is optional, and the default text is `"check ok"`, so just use `check()`. 

The logging to console happens only in local/development environment, i.e. when the following variable is `true`':

```JavaScript
isDev       // true if the URL begins with 'localhost', '127.0', etc... 
```

This is a variable, not a function. You can use it in statements like 

```JavaScript
if (isDev) { /*code that runs only in local/development environment*/ }
```

### **Quick error for debugging (dev/prod)**
```JavaScript
err(message)        // throw new Error(message)
```
(The `err` function throws the error in dev and prod enviroments. )

<hr>


## **Functions for handling variables:**


### **Arrays and Vectors**

```JavaScript
Unique(array)           // returns the unique elements of an array
Sum(array)              // retruns the sum of the items elements
SortByNumber(array)     // sorts the array numerically
RunningTotal(array)     // running total
Vector.add(vector)               // add two vectors
Vector.subtract(vector)           // subtract two vectors
Vector.multiply(vector,number)         // multiply two vectors per element
Vector.dotProduct(vector1,vector2)  // returns the dot product of two vectors
```

These do what they seem they do! Return the last item of the array (like `pop` without removing it), return the sum of the values of an array, return an array having only the unique values of the original, and sort an array of numbers numerically. 

### **Strings**
```JavaScript
properTrim(sentence)        // a "Microsoft Excel" type of trim()
wordsOf(sentence)           // an array of the words of a sentence (uses trim)
```

### **Numbers (converting to / extracting numeric values)**

```JavaScript
numberOf(whatever)
parseNumber(whatever)
```

`numberOf` reformats an already number-ish value (if needed) ensuring that it will return a number. 
Examples: "5"=>5, "3.2"=>3.2, true=>1, "3.2 meters"=>0, "text"=>0. 

`parseNumber` tries to convert/parse/understand/extract a string/number in order to return a number. It uses `parseFloat`.
Examples: "5"=>5, "3.2 meters"=>3.2, "text"=>0, true=>0.



### **CSS: change css properties**

```JavaScript
setCssProperty(variable,value)
setCssProperty('--backColor','red')
```

Changes easily a CSS variable. Replaces the long function `document.documentElement.style.setProperty`. Don't forget the "`--`"! 


### **Get the specific type of a varialbe**
```JavaScript
Dim.typeof(variable)
```
Returns one of the following: `string`, `number`, `boolean`, `function`, `undefined`, `symbol`, `null`, `array`, `date`, `regexp`, `error`, or a custom class constructor... Not simply the generic "object" that native `typeof` returns. 

<hr>

## **A better fetch**
```JavaScript
DimFetch(URL,property=null,tries=3)
```
Fetch, with 3 tries, in only one step. It returns a promise. 
As for the `property`, set the name of property to grab the object property (`result.specificProperty`), set `true` to return the entire object, or set `null` / `false` to get as text.

## **Watch variables for changes:**

### `Dim.watch`

```JavaScript
Dim.watch('myVariable',myCallback)
```
This should be used only in development environment, because it creates a `setInterval` under the hood. You can also use it in production enviromnent as well, but it is not recommended. Use the variable's name as a string (in quotes). The callback function is optional, and console-logs the change if omitted. Write your callback function without "()", or use bind instead.


<hr>

## **Integer Generator Functions**

### **Integer Generator**

Creates an integer generator. Every time you call it, it returns the next integer. 
Example on how to use: https://codepen.io/dimvai/pen/xxdamLb

**1st step**. Define your function:
```JavaScript
let nextNumber = IntegerGenerator(1)
```
The argument is optional and defines the first integer. If omitted, then it starts at `1`. 


**2nd step**. Call your function (without any arguments) as many times you want: 
```JavaScript
nextNumber()  // returns 1
nextNumber()  // returns 2
nextNumber()  // returns 3
```

### **Random Sequence of integers**

```JavaScript
Dim.RandomSequence(length)
```
Returns an array of integers in `[0,1,...,length-1]` in random sequence.

### **Custom element generator**
```JavaScript
CreateCustomElement({})
```
This needs its own documentation

<hr>



## **Keyboard Event Listeners**

### `KeyString(keyEvent)`

A function that returns a *human-friendly* way to detect what keyboard keys or combinations are pressed during eventlisteners.
For example, you can check if user has pressed Ctrl+Z easily:
```JavaScript
if (KeyString(e)=="Ctrl+Z")      //instead of: if (e.keyCode == 90 && e.ctrlKey)
```

Other examples:

```JavaScript
document.addEventListener("keydown",function(keyEvent){
    let keyString = KeyString(keyEvent);
    if (keyString == "Alt+U"){
        /* do something */
    } else if (keyString == "Ctrl+S"){
        keyEvent.preventDefault();      // do not use the default browser "Save website as"
        /* Code for Saving user's data in database */
    }
});
inputText.addEventListener("keydown",function(keyEvent){
    if (KeyString(keyEvent)=='Ctrl+Shift+A') {
        // code
    } else if (KeyString(keyEvent)=='Alt+Ctrl+Shift+Q') {
        // code
    }
});
```
You can check out what KeyString outputs here: https://codepen.io/dimvai/pen/KKvZMoL

<hr>




## **Navigation, URL, Get parameters**


### `Dim.Nav`

Dim.Nav is a set of methods for easy window/URL manipulation. It has METHODS, not vairables, so it it is updated with the current (updated) parameters when client routing.
Examples of methods:
```JavaScript
// returns the value of the GET parameter of the URL
Dim.Nav.GetParameters('gameId')       
// if parameter not defined, it returnes all GET parameters in a key-value object.
Dim.Nav.GetParameters()  

// refreshes current page (optionalparameter)
Dim.Nav.RefreshWindow()
Dim.Nav.RefreshWindow(false)       //refresh and get rid of get parameters

// return the current full URL, only the domain, or only the local (relative) path:
Dim.Nav.URL()
Dim.Nav.domain()
Dim.Nav.path()
// return the previous/referer/origin URL or previous domain only 
// (depends on "allow origin" property of previous website):
Dim.Nav.previous() 

// Used in client-side routing. 
// Changes URL in the URL bar, so a new item is also created in browser's history
Dim.Nav.CreateNewState(localPath)
// then, you need to use window.onpopstate to tell the browser what to do 
// when the uses presses back or forward, because no "real new" page was loaded. 

```

<hr>




## **RegExp Utilities**

### `RegularExpression`

Use them with the `test` Javascript function. If you use them with `match` function, you may need to add `/g` or other flags. These are designed to be used with the `RegExp.test(String)` function. 

Live example here: https://codepen.io/dimvai/pen/MWodGmv

```JavaScript
// this RegExp returns true if the string contains "oneString"
RegularExpression.Contains(oneString)    
// returns: .*oneString.*

// this RegExp returns true if the string contains one of the two strings
RegularExpression.Contains(firstString,secondString)   
// returns:  .*(firstString|secondString).*

// this RegExp returns true if the string contains none of the strings
RegularExpression.ContainsNot(firstString,secondString)

// you get the idea!
RegularExpression.StartsWith(firstString,secondString)
RegularExpression.StartsWithNot(firstString,secondString)
RegularExpression.EndsWith(firstString,secondString)
RegularExpression.EndsWithNot(firstString,secondString)

// this RegExp returns true if the string contains one of the strings of the firstArray AND none of the strings of the secondArray
RegularExpression.ContainsWhileDoesNotContain(firstArray,secondArray)

// this RegExp returns true
RegularExpression.Everything()      //returns: .*
```

### **How to use RegularExpression:**
```JavaScript
RegularExpression.Contains(["someone","somewhat"]).test("this string is somewhat weird" )
// true, because the string contains "somewhat" or "someone"

RegularExpression.ContainsWhileDoesNotContain(["someone","somewhat"],["something"]).test("this string is somewhat weird") 
// true, because the string contains "somewhat" or "someone" while does not contain "something". 
```
Of course you can use the official `test()` property of a `RegExp` type. 

<hr>

## **Executions**

### `Dim.executeOnce(func)`

Execute the function func only once, even if is called more times. How to use: Simply use `executeOnce(func)` to call `func` instead of simply `func()`. (If you call `func()` it will be run every time of course!). Use bind to pass arguments. Examples: 

```JavaScript
Dim.executeOnce(updateDiv)
Dim.executeOnce(notify.bind(this."error"))
```

### `Dim.executeSparsely(func, minInterval)`

Executes the function `func` only once every `minInterval` milliseconds (optional argument), even if you call it more often. Common use of this is inside event listeners (eg `hover`) where you do not want something to run .

How to use:
```JavaScript
Dim.executeSparsely(updateDiv,500)
Dim.executeSparsely(notify.bind(this."error"),2000)
```

### `Dim.executeAfterRapidFire(func, waitFor) `

Executes the function only after it has stopped being called for an interval of `waitFor` milliseconds (optional argument). Examples (inside an `event listener`):
```JavaScript
Dim.executeAfterRapidFire(updateDiv,500), 
Dim.executeAfterRapidFire(notify.bind(this."error"),2000)
```

### `setIntervalFiniteTimes(func, interval, num, finallyExecute)`

Executes a function specific (`num`) number times. `finallyExecute` is an optional function to call in the end. Do not use parenthesis (use `bind` if you have arguments). 


<hr>

## **Pausing Execution**

### `delay(pauseInterval)`

Use inside an `async` function to pause execution for `pauseInterval` milliseconds: 

```JavaScript
let myAsyncFunction = async () => {
    //other commands
    await delay(2000);  //pauses for 2 seconds
    //other commands
}
```
<hr>

## **Execute or Continue execution when condition is met**

### `until(condition)`

Wait for a condition to be met and, only then, continue execution of the parent `async` function. This is the **recommended** way to implement: 

```JavaScript
let myCondition = () => (number==1);        // function that returns true if number==1
let myAsyncFunction = async () => {
    //other commands
    await until (myCondition);  // waits for myCondition to be met
    //other commands
}
```

The use of a function (without () or with the use of `bind`) is the recommended one. But, you can also use one of these:
```JavaScript
await until ('number==1')
await until ('number')      // continues if number is true/truthy
await until ({number})      // continues if number is true/truthy
```

These do not work:
```JavaScript
await until (number==1)     // does not work
await until (number)        // does not work
```

### `setTimeoutUntil(condition, callbackFunction, checkInterval)`

Waits for a condition to be met and, only then, executes a function. `checkInterval` is optional and defined in milliseconds. 

The recommended way to use it is using defined functions:

```JavaScript
let myCondition = ()=>(number==1)   // gets true if number==1
let callWhenReady = ()=>console.log("run when ready")    // this function will run
setTimeoutUntil(myCondition,callWhenReady)
```

Besides the above recommended way, you can also use:
```JavaScript
setTimeoutUntil('number==1',()=>console.log("run"))
setTimeoutUntil('number',()=>console.log("run"))    // run when number gets true/truthy
setTimeoutUntil({number},()=>console.log("run"))    // run when number gets true/truthy   
```
These do not work:
```JavaScript
// do not use () in either argument. Use bind instead.
setTimeoutUntil(myCondition(),callWhenReady)    // does not work
setTimeoutUntil(number,callWhenReady)           // does not work
```

<hr>


## **Cookies**

```JavaScript
set(name, value, days=30)
get(name)
erase(name)
```
These are self-explanatory, so no need to explain. `name` is the name of the cookie. 

<hr>

## **Loading things ard reloading page**

### ```Dim.refreshWindow()```

Use `refreshWindow()` to refresh the page. Use `refreshWindow(true)` to get rid of `GET` parameters in the url during reloading. 

### ```Dim.GetParameters()```

Use, usually during loading page, to get all `GET` parameters from URL in an Object format of key-value pairs. Use: `parametersObject = GetParameters()` to store the result object to `parametersObject` object. 

### ```Dim.LazyLoadImages()```

Loads images after a while. Needs appropriate CSS. Recommended to use fixed image sizes. Optional parameter delay. Use `Dim.LazyLoadImages(2000)` to load images after 2 seconds. Default= 1000 (1 second).

### ```Dim.LazyLoadResource(CSS-or-JS-resource)```

Loads CSS or JS file using jQuery. Of course, it needs `jQuery`! For example: 
```JavaScript
Dim.LazyLoadResource('mystyle.css')
Dim.LazyLoadResource('myscript.js')
```

### ```Dim.load(targetDIV, URL-of-HTML-file)```

jQuery.load alternative. Use `$(targetDIV).load(URL)` if you have jQuery. Loads an html and puts it to the div. 


<hr>

<hr>

## **Enjoy!**
