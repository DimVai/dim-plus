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



## **Selecting HTML Elements**


### `Q(element)`

Use `Q` to select HTML Elements. It is used similarlly to `$(element)` in `jQuery` and it replaces the long functions `document.querySelectorAll(elements)` and `document.querySelector(element)`. If the parameter is an `id` then this returns the HTML element with this id (or returns null). If it is an element name (like `p` or `li`) or a class, then it returns a (possibly empty) NodeList (array-like object with HTML Elements). Examples:
```JavaScript
Q('p')      //returns an array-like object of all p elements 
Q('.btn')   //returns an array-like object of all elements with class "btn"
Q('#leave') //returns the element with id "leave"
```

###  `Create Variables From HTML Ids`

```JavaScript
createVariablesFromDOM()
```
Use this to convert all html elements with `id` to global variables with the same name. Usually, the browser does it itself, but, just in case. Be careful to choose names that are **valid**, not only for html ids, but for JavaScript variables as well.
After this, you can use for example `leave.innerHTML` instead of `document.getElementById('leave').innerHTML`;
<hr>

## **Logging to console in development environment**
### `Console debug, only in local/dev`
```JavaScript
log("message")          //console.log("message")
check()                 // console.debug("check ok"), only in local/dev 
check("button pressed") //console.debug("button pressed"), only in local/dev
```

Use these to output something to console. So, use `log(message)`, instead of `console.log(message)` and `check(message)` instead of `console.debug(message)`. In `check`, the message is optional, and the default text is `"check ok"`, so just use `check()`. `check` logs in console only in local/dev environment
The logging to console happens only in local/development environment, i.e. when the following variable is `true`':
### `Check for local/dev`
```JavaScript
isDev       //true if the URL begins with 'localhost', '127.0', etc... 
```
This is a variable, not a function. You can use it in statements like 
```JavaScript
if (isDev) {
    //code that runs only in local/development environment
}
```

<hr>


## **Variables and prototypes:**


### `Methods for arrays`

```JavaScript
Array.last()
Array.unique()
Array.numberSort()
```

These do what they seem they do! Return the last item of the array (like `pop` without removing it), return an array having only the unique values of the original, and sort an array of numbers numerically. 

### `setCssProperty(variable,value)`



```JavaScript
setCssProperty('--backColor','red')
```

Changes easily a CSS variable. Replaces the long function `document.documentElement.style.setProperty`. Don't forget the "`--`"! 

<hr>

### `safeEval(expressionAsString)`

Give it a string with a name of expression/variable. If the expression/variable evaluates, the function returns the evaluation. Else, it returns `false` or the second optional argument.
```JavaScript
let surname = 'Johnes'
safeEval('surname')                         // 'Johnes'
safeEval('surName')                         //  false
safeEval('surName','there is no surname')   // 'there is no surname'
```

<hr>



## **Watch varialbe for changes:**

### `Dim.watch`

```JavaScript
Dim.watch('myVariable',myCallback)
```
This should be used only in development environment, because it creates a `setInterval`, but you can also use it in production enviromnent as well. Use the variable's name as a string (in quotes). The callback function is optional, and console-logs the change if omitted. Write your callback function without "()" or use bind instead.

### `Dim.declareWatchedVariable`

```JavaScript
//instead of: let myFirstVariable = 12
declareWatchedVariable('myFirstVariable', 12)  
//instead of: let mySecondVariable=0
declareWatchedVariable('mySecondVariable', 0, myCallback) 
```
Use this method, instead of `var` or `let` to declare variable that is being watched. The callback function is optional, and console-logs the change if omitted. Write your callback function without "()" or use bind instead. The value is optional and the default value is `null`. 



## **Integer Generator**

### `intGenerator()`

Creates an integer generator. Every time you call it, it returns the next integer. 
Example on how to use:

**1st step**. Define your function:
```JavaScript
let nextNumber = intGenerator(1)
```
The argument is optional and defines the first integer. If omitted, then it starts at `1`. 


**2nd step**. Call your function (without any arguments) as many times you want: 
```JavaScript
nextNumber()  //returns 1
nextNumber()  //returns 2
nextNumber()  //returns 3
```

<hr>

## **Executions**

### `Dim.executeOnce(func)`

Execute the function func only once, even if is called more times. How to use: Simply use `executeOnce(func)` to call `func` instead of simply `func()`. (If you call `func()` it will be run every time of course!). Use bind to pass arguments. Examples: 

```JavaScript
Dim.executeOnce(updateDiv)
Dim.executeOnce(notify.bind(this."error"))
```

### `Dim.executeSparsely(func, minInterval)`

Executes the function `func` only once every `minInterval` milliseconds (optional argument), even if you call it more often. Common use of this is inside eventlisteners (eg `hover`) where you do not want something to run .

How to use:
```JavaScript
Dim.executeSparsely(updateDiv,500)
Dim.executeSparsely(notify.bind(this."error"),2000)
```

### `Dim.executeAfterRapidFire(func, waitFor) `

Executes the function only after it has stopped being called for an interval of `waitFor` milliseconds (optional argument). Examples (inside an `eventlistener`):
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

The use of a function (without () or use `bind`) is the recommended one. But, you can also use one of these:
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
