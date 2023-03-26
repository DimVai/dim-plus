const input = document.querySelector("input")
const defaultText = document.getElementById("default")
const debounceText = document.getElementById("debounce")
const throttleText = document.getElementById("throttle")


// in order for debouce to work, you need to create a seperate "constant" function. 
// Do not place debounce inside the event listener, because it will create a new debounced function every time.

const updateDebounceText = (place,text) => place.textContent = text;
const updateDebounceTextDebounced = debounce(updateDebounceText,400);   //do not include arguments in the inner function 

const updateThrottleText = throttle((place,text) => {
    place.textContent = text;
}, 400)


input.addEventListener("input", e => {
    defaultText.textContent = e.target.value
    updateDebounceTextDebounced(debounceText,e.target.value)
    // debounce(()=>updateDebounceText(debounceText,e.target.value),400);   // does not work
    updateThrottleText(throttleText,e.target.value)
});





/*
const updateDebounceText = debounce(() => {
    incrementCount(debounceText)
  })
  const updateThrottleText = throttle(() => {
    incrementCount(throttleText)
  }, 100)
 
  document.addEventListener("mousemove", e => {
    incrementCount(defaultText)
    updateDebounceText()
    updateThrottleText()
  })
  
  function incrementCount(element) {
    element.textContent = (parseInt(element.innerText) || 0) + 1
  }
*/


/** 
 * Dim Notes:
 * Creates a NEW debounced version of a given (declared/named) function 
 * Do not put debounce inside the event listener, because it will create a new debounced function every time.
 * although it may work in functions with no arguments... (see my codepen how)
 * Preferred way: Just create the debounced version of the function outside the event listeners.
 */
function debounce(callbackFunction, delay = 400) {
    let timeout
    return (...args) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        callbackFunction(...args)
      }, delay)
    }
  }
  
  function throttle(cb, delay = 400) {
    let shouldWait = false
    let waitingArgs
    const timeoutFunc = () => {
      if (waitingArgs == null) {
        shouldWait = false
      } else {
        cb(...waitingArgs)
        waitingArgs = null
        setTimeout(timeoutFunc, delay)
      }
    }
  
    return (...args) => {
      if (shouldWait) {
        waitingArgs = args
        return
      }
  
      cb(...args)
      shouldWait = true
  
      setTimeout(timeoutFunc, delay)
    }
  }
  
