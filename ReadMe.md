## My personal CSS/JS Add-ins (Helpers) I use when I code
Feel free to steal my code!

# **dim-structure.css**

CSS Classes.

Note that everything uses the default bootstrap breakpoints:
```CSS
	--sm: 576px;
	--md: 768px;
	--lg: 992px;
	--xl: 1200px;
	--xxl: 1400px;
```

<hr>

## **Slim containers**

```CSS
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
```

Centers one or more children horizontally. If there is more space vertically, it will also center it/them vertically. If there are more than one, they will be stacked one below the other. 

You can place more than one "things" inside, and they will all be centered. *Note*: if it is a text paragraph, the class will "position" it to the center, not "align" it.

```CSS
center-contents-inline
```

Centers children, only horizontally, all in the **same line**.

```CSS
center-contents-inline-middle
```

Centers the child/children **both vertically and horizontally**. If more than one item, they will be on the same line. 

Finally, these inline cases are **responsive** using the `md` and `lg` breakpoints, meaning that they are not inline in smaller devices. Examples:

```css
center-contents-md-inline 
center-contents-lg-inline-middle
```
<hr>

## **Standard inline structures**

Use the standard inline structure for easy inline alignment of children (for example in the header):
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

```CSS
center-left
```
center on mobile, left on desktop
CSS for Lazy images. In the HTML set:
```HTML
<img src="nothing-or-small-pic" data-src="real-img-source" data-lazy="#">
```

Easy Dark mode. Add one of theses classes according to your needs. Then, when you want to toggle dark mode, add (with JavaScript) the class `dark-mode` (everywhere or where you want). 

```CSS
darkable
noDark
```



<hr>
<hr>
<hr>
<hr>

# **dim.js**



## **Selecting HTML Elements with the Q selector**


### `Q(queryString)`

### **General description**

Use `Q` to select HTML Elements. It is used similarly to `$(elements)` in `jQuery`. However, it returns DOM elements, not jQuery elements,and it replaces the long functions `document.querySelectorAll(elements)` and `document.querySelector(element)`. If the parameter is an `#id` then `Q` returns the HTML element with this id (or returns null). Else, (if it is an element name (like `p` or `li`), a `.class` or something other), then it returns a (possibly empty) NodeList (array-like object with HTML Elements). Examples:
```JavaScript
Q('p')      //returns an array-like object of all p elements 
Q('.btn')   //returns an array-like object of all elements with class "btn"
Q('#send') //returns the element with id "send"
```

### **Selectors by ID**

In the case of an `#id` (single element), you can also use the following **additional** methods that are now available:
```JavaScript
/***  Display and CSS  ***/
Q('#message').hide()                       //hides the element (display none)
Q('#message').show()                       //shows the element if hidden (display revert)
Q('#message').addClass('className')        //adds a class to an element
Q('#message').removeClass('className')     //removes a class from an element
Q('#message').toggleClass('className')     //toggles a class to an element   

//replaces the text (textContent) of an element
Q('#message').set(text)            
//when 'html', it replaces the innerHTML of an element          
Q('#message').set(richText,'html')           

//Makes a GET request from a URL, and then replaces 
//the text of `#textFromOuside` with the GET response. 
Q('#textFromOuside').fetch(URL)                     
//If the result is an object (and not a singe value/text), 
//you must specify the second argument (pathFunction) as a funtion of this object:
Q('#textFromOuside').fetch(URL,resObj=>resObj.specificProperty)
//Sends a POST request to URL sending an object with the value of #textArea. 
//The data is in the format: {parameterName:valueOfInput}
Q('#textArea').post(URL,parameterName)         

/***  Event listeners  ***/
Q('#menuItem').on(event,callback)                   //on=eventlistener
Q('#menuItem').onClick(callback)                    //eventlistener('click',...
Q('#menuItem').onInputChange(callback)              //eventlistener('input,...
//onkeydown using the special keyString variable, defined below. Example:
Q('#menuItem').onKeyboard(function(keyString){
    if (keyString="Ctrl+S") {/*save the item to database*/}
})
```

In the case of `Q(window)` or `Q(document)`, only `on` and `onKeyboard` are added to its standard methods. 

### **Selectors by Class or general selectors**

In the case of an element name (like `p` or `li`), a `.class` or `[data-attribute="something"]`, the result is a NodeList (it uses `document.querySelectorAll()`) that is generally difficult to use. So, you can use the following added methods:

```JavaScript
/***  Display and CSS   ***/
Q('.symbols').hide()                      //hide all elements (display none)
Q('.symbols').show()                      //show all elements if hidden (display revert)
Q('.alerts').addClass('className')        //add a class to all elements
Q('.alerts').removeClass('className')     //remove a class from all elements
Q('.alerts').toggleClass('className')     //toggle a class to all elements   

//replace the text (textContent) of all elements
Q('.className').set(text)            
//when 'html', it replaces the innerHTML of all elements          
Q('.className').set(richText,'html')           

//on=eventlistener on all elements
Q('.menuItem').on(event,callback)   


// DO SOMETHING TO ALL ELEMENTS OF NODELIST:

//  1. For custom functions on all elements  -  Use map or forEach as usual. 
// * Note that NodeList does not support map. It is an added method!
//array of firstWord of paragraphs 
Q('.mainParagraph').map(parapraph=>firstWord(paragraph))         

//  2. For single properties  -  Just use the property!
Q('.mainParagraph').title                   //an array of the titles of all elements!
Q('.mainParagraph').firstChild              //an array of the firstChilds(!) of all elements!
Q('.mainParagraph').outerHTML = `some html`    //sets all elements' outerHTML!
//this does not work with nested properties:
Q('.mainParagraph').firstChild.innerHTML        //error! Use map instead. 

//  3. For methods  -  Use .each
//get an array of the data-testAttr of all elements!
Q('.someClass').each.getAttribute('data-someAttr')  
//change or set the data-testAttr of all elements! 
Q('.someClass').each.setAttribute('data-someAttr','new value')
```

### **Selectors by JavaScript Variable using ~**

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




## **Navigation, URL, Get parameters**


### `Dim.Nav`

Dim.Nav is a set of methods for easy window/URL manipulation. It has METHODS, not vairables, so it it is updated with the current (updated) parameters when client routing.
Examples of methods:
```JavaScript
//returns the value of the GET parameter of the URL
Dim.Nav.GetParameters('gameId')       
//If parameter not defined, it returnes all GET parameters in a key-value object.
Dim.Nav.GetParameters()  

//Refreshes current page (optionalparameter)
Dim.Nav.RefreshWindow()
Dim.Nav.RefreshWindow(false)       //refresh and get rid of get parameters

//return the current full URL, only the domain, or only the local (relative) path:
Dim.Nav.URL()
Dim.Nav.domain()
Dim.Nav.path()
//return the previous/referer/origin URL or previous domain only 
//(depends on "allow origin" property of previous website):
Dim.Nav.previous() 

//Used in client-side routing. 
//Changes URL in the URL bar, so a new item is also created in browser's history
Dim.Nav.CreateNewState(localPath)
//Then, you need to use window.onpopstate to tell the browser what to do 
//when the uses presses back or forward, because no "real new" page was loaded. 

```

<hr>


## **Logging to console only in development environment**
### `Console log/debug only in local/dev`
```JavaScript
log("message")          //console.log("message"), only in local/dev 
check()                 // console.debug("check ok"), only in local/dev 
check("button pressed") //console.debug("button pressed"), only in local/dev
```

Use these to output something to console. So, use `log(message)`, instead of `console.log(message)` and `check(message)` instead of `console.debug(message)`. In `check`, the message is optional, and the default text is `"check ok"`, so just use `check()`. 

The logging to console happens only in local/development environment, i.e. when the following variable is `true`':

### `Check for local/dev`
```JavaScript
isDev       //true if the URL begins with 'localhost', '127.0', etc... 
```

This is a variable, not a function. You can use it in statements like 

```JavaScript
if (isDev) { /*code that runs only in local/development environment*/ }
```

<hr>


## **Variables and prototypes:**


### `Methods for arrays`

```JavaScript
Array.last()
Array.sum()
Array.unique()
Array.sortByNumber()
```

These do what they seem they do! Return the last item of the array (like `pop` without removing it), return the sum of the values of an array, return an array having only the unique values of the original, and sort an array of numbers numerically. 

### `Converting to / Extracting numeric values`

```JavaScript
numberOf(whatever)
parseNumber(whatever)
```

`numberOf` reformats an already number-ish value (if needed) ensuring that it will return a number. 
Examples: "5"=>5, "3.2 meters"=>0, true=>1, "text"=>0. 

`parseNumber` tries to convert/parse/understand/extract a string/number in order to return a number. It uses `parseFloat`.
Examples: "5"=>5, "3.2 meters"=>3.2, "text"=>0, true=>0.  


### `String.test(RegExp)`

```JavaScript
String.test(stringOrRegexp)
```
This has the same functionality as` regex.test(string)`, but with different (usually more convenient) syntax. See below for ready Regular Expressions that `dim.js` provides. 

Additionally, you can pass string as a parameter, which has the same functionality as `string.includes(string)`. 


### `setCssProperty(variable,value)`


```JavaScript
setCssProperty('--backColor','red')
```

Changes easily a CSS variable. Replaces the long function `document.documentElement.style.setProperty`. Don't forget the "`--`"! 


### `safeEval(expressionAsString)`

Give it a string with a name of expression/variable. It is used like `IFERROR` in Microsoft Excel. If the expression/variable evaluates (is not an error), the function returns the evaluation. Else, it returns `false` or the second optional argument.
```JavaScript
let surname = 'Johnes'
safeEval('surname')                         // 'Johnes'
safeEval('surName')                         //  false
safeEval('surName','there is no surname')   // 'there is no surname'
```

<hr>



## **Watch variables for changes:**

### `Dim.watch`

```JavaScript
Dim.watch('myVariable',myCallback)
```
This should be used only in development environment, because it creates a `setInterval` under the hood. You can also use it in production enviromnent as well, but it is not recommended. Use the variable's name as a string (in quotes). The callback function is optional, and console-logs the change if omitted. Write your callback function without "()", or use bind instead.


<hr>

## **Integer Generator**

### `IntegerGenerator()`

Creates an integer generator. Every time you call it, it returns the next integer. 
Example on how to use: https://codepen.io/dimvai/pen/xxdamLb

**1st step**. Define your function:
```JavaScript
let nextNumber = IntegerGenerator(1)
```
The argument is optional and defines the first integer. If omitted, then it starts at `1`. 


**2nd step**. Call your function (without any arguments) as many times you want: 
```JavaScript
nextNumber()  //returns 1
nextNumber()  //returns 2
nextNumber()  //returns 3
```

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
        //do something
    } else if (keyString == "Ctrl+S"){
        keyEvent.preventDefault();      //Do not use the default browser "Save website as"
        //Code for Saving user's data in database
    }
});
inputText.addEventListener("keydown",function(keyEvent){
    if (KeyString(keyEvent)=='Ctrl+Shift+A') {
        //code
    } else if (KeyString(keyEvent)=='Alt+Ctrl+Shift+Q') {
        //code
    }
});
```
You can check out what KeyString outputs here: https://codepen.io/dimvai/pen/KKvZMoL

<hr>




## **RegExp Utilities**

### `RegularExpression`

Use them with the `test` Javascript function. If you use them with `match` function, you may need to add `/g` or other flags. These are designed to be used with the `RegExp.test(String)` function or the `String.test(RegExp)` function that is defined in this `dim.js`.

Live example here: https://codepen.io/dimvai/pen/MWodGmv

```JavaScript
//this RegExp returns true if the string contains "oneString"
RegularExpression.Contains(oneString)    
//returns: .*oneString.*

//this RegExp returns true if the string contains one of the two strings
RegularExpression.Contains(firstString,secondString)   
//returns:  .*(firstString|secondString).*

//this RegExp returns true if the string contains none of the strings
RegularExpression.ContainsNot(firstString,secondString)

//you get the idea!
RegularExpression.StartsWith(firstString,secondString)
RegularExpression.StartsWithNot(firstString,secondString)
RegularExpression.EndsWith(firstString,secondString)
RegularExpression.EndsWithNot(firstString,secondString)

//this RegExp returns true if the string contains one of the strings of the firstArray AND none of the strings of the secondArray
RegularExpression.ContainsWhileDoesNotContain(firstArray,secondArray)

//this RegExp returns true
RegularExpression.Everything()      //returns: .*
```

How to use them:
```JavaScript
"this string is somewhat weird" .test(RegularExpression.Contains(["someone","somewhat"])) 
//true, because the string contains "somewhat" or "someone"

"this string is somewhat weird" .test(RegularExpression.ContainsWhileDoesNotContain(["someone","somewhat"],["something"])) 
//true, because the string contains "somewhat" or "someone" while does not contain "something". 
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
let myCondition = () => (number==1);        //function that returns true if number==1
let myAsyncFunction = async () => {
    //other commands
    await until (myCondition);  //waits for myCondition to be met
    //other commands
}
```

The use of a function (without () or with the use of `bind`) is the recommended one. But, you can also use one of these:
```JavaScript
await until ('number==1')
await until ('number') //continues if number is true/truthy
await until ({number}) //continues if number is true/truthy
```

These do not work:
```JavaScript
await until (number==1)    //does not work
await until (number)        //does not work
```

### `setTimeoutUntil(condition, callbackFunction, checkInterval)`

Waits for a condition to be met and, only then, executes a function. `checkInterval` is optional and defined in milliseconds. 

The recommended way to use it is using defined functions:

```JavaScript
let myCondition = ()=>(number==1)   //gets true if number==1
let callWhenReady = ()=>console.log("run when ready")    //this function will run
setTimeoutUntil(myCondition,callWhenReady)
```

Besides the above recommended way, you can also use:
```JavaScript
setTimeoutUntil('number==1',()=>console.log("run"))
setTimeoutUntil('number',()=>console.log("run")) //run when number gets true/truthy
setTimeoutUntil({number},()=>console.log("run")) //run when number gets true/truthy   
```
These do not work:
```JavaScript
//do not use () in either argument. Use bind instead.
setTimeoutUntil(myCondition(),callWhenReady)   //does not work
setTimeoutUntil(number,callWhenReady)       //does not work
```

<hr>


## **Cookies**

```JavaScript
setCookie(name, value, days=30)
getCookie(name)
eraseCookie(name)
```
These are self-explanatory, so no need to explain.

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
