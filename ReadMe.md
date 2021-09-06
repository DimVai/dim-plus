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

Set the parent as

`OpenChildrenOnClick` or `OpenChildrenOnHover`

And the drop down area:

`DropdownArea`

Note 1. The trigger-button does not need a class.

Note 2. If you want the trigger-button to remain "hovered" when you hover the drop down area, add manually in your css:
`.DropdownArea:hover .trigger-btn { [hovered btn style] }`

<hr>

## **Centering things**

`center`

Centers an image or a text. 


Although the above class does its job most of the time, mainly in text or pictures, the **recommended** way to center **everything** is to add the appropriate class to the **parent**:

`center-contents`

Centers one or more children horizontally. If there is more space vertically, it will also center it/them vertically. If there are more than one, they will be stacked one below the other. 

You can place more than one "things" inside, and they will all be centered. *Note*: if it is a text paragraph, the class will "position" it to the center, not "align" it.

`center-contents-inline`

Centers children, only horizontally, all in the **same line**.

`center-contents-inline-middle`

Centers the child/children **both vertically and horizontally**. If more than one item, they will be on the same line. 

Finally, these inline cases are **responsive** using the `md` and `lg` brakpoints, meaning that they are not inline in smaller devices. Examples:

```css
center-contents-md-inline 
center-contents-lg-inline-middle
```
<hr>

## **Standard inline structures**

Use the standard inline stucture for easy inline alignment of children (for example in the header):
```css
standard-inline-3   /*left-center-right*/
standard-inline-2   /*left-right*/
```
These can contain 2 or 3 (`div` or anything) children, where the first child is placed on the left and the last on the right. The middle child (in the `-3` class) is centered.

These classes are **not responsive**. Maybe in the next version. 

The **difference** using `flex` or a simple `grid` to implement these, is that those cases break where the children have weird sizes (i.e. some are very large and others are very small...)
<hr>

## **Equal Columns**

`equal-columns`

Use this in order to have arbitrary number of children-columns (`div` or anything) with equal widths.

This is responsive with the `md` and `lg`:
```css
equal-columns-md 
equal-columns-lg   
```

<hr>

## **Paragraph text to columns**

`columns`

This class splits a text/paragraph to columns, using the standard widths recommended for easier reading (that's why it is not customizable).


<hr>

## **Gallery of pictures**

This is a very diffucult task that gets done easily. The classes are:
```css
gallery-grid 
gallery-flex  
```
They have their children (divs or images) in a nice responsive grid.

These have a few differences (mainly in the maximum sizes of the children and in the alignment of the last row). **Try both** and then deside.

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
The `style` attribute with the parameteres is optional. 

(For `gallery-flex`, use `gallery-flex` in the above HTML snippet instead of `gallery-grid`. The style attribute is the same and it is optional.)


<hr>


## **Scrolling**

`scrollable`

**No scrollbars**, but keeping the ability to scroll with the mouse scroll wheel.

`no-scrollable`

**No-scrollbars** and **no ability to scroll** even with mouse scroll wheel.

`scrollable-bars`

Adds scrollbars and the ability to scroll if for some reason they do not exist.







<hr>
<hr>


## **CSS Classes with no documentation or support**

`unseparated`: Use in a `span`. The text inside this span will be in a single line (no wrapping) if it can fit in page's width. 

`sticky`: stick something to top, when scroll by.

`center-left`: center on mobile, left on desktop.

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

# **dim-plus.js**


## **Variable and prototypes:**


```JavaScript
Array.last()
Array.unique()
Array.numberSort()
```
These do what they seem they do! Return the last item of the array (like `pop` without removing it), return an array having only the unique values of the original, and sort an array of numbers numerically. 

### `IsValid(variable)`

Returns true if variable/anything has value, or false if it is null/undefined.

<hr>

## **Integer Generator**

### `intGenerator()`

Creates an integer generator. Every time you call it, it returns the next integer. 
Example on how to use:

**1st step**. Define your function:
```JavaScript
let nextNumber = intGenerator(1)
```
The argument is optional and defines the first integer. If ommited, then it starts at `1`. 


**2nd step**. Call your function (without arguments) as many times you want: 
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

Executes the function `func` only once every `minInterval` milliseconds (optional argument), even if you call it more often. Common use of this is inside eventlisteners (eg `hover`) where you do not want something to run continiousely.

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
await until ('number') //continues if number is true/truthly
await until ({number}) //continues if number is true/truthly
```

These do not work:
```JavaScript
await until (number==1)    //does not work
await until (number)        //does not work
```

### `setTimeoutUntil(condition, callbackFunction, checkInterval)`

Waits for a condition to be met and, only then, executes a function. `checkInterval` is optional and defined in milliseconds. 

The redommended way to use it is using defined functions:

```JavaScript
let myCondition = () => (number==1)   //gets true if number==1
let callWhenReady = ()=>console.log("run when ready")    //this function will run
setTimeoutUntil(myCondition,callWhenReady)
```

Besides the above recommended way, you can also use:
```JavaScript
setTimeoutUntil('number==1',()=>console.log("run"))
setTimeoutUntil('number',()=>console.log("run")) //run when number gets true/truethly
setTimeoutUntil({number},()=>console.log("run")) //run when number gets true/truethly   
```
These do not work:
```JavaScript
setTimeoutUntil(myCondition(),callWhenReady)        //do not use () in either argument. Use bind
setTimeoutUntil(number,callWhenReady)       //does not work
```

<hr>

## **Logging to console**
```JavaScript
log("message")
check()
```

So, use `log(message)`, instead of `console.log(message)` and `check(message)` instead of `console.debug(message)`. In `check`, the message is optional, and the default text is `"check ok"`, so just use `check()`;

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
