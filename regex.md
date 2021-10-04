Handbook for using RegEx, not to find/replace strings, but to test strings for a condition

match **anything** (always true):

```
.*
```
## Contains

true, if it **contains** the word "cdn":
```
.*cdn.*
```

Explanation: it matches: anything + cdn + anything! 

true, if it **contains** the word "cdn" or the word "npm":
```
.*(cdn|npm).*
```

Generally, to set an `or`, replace `string` with 
`(firstString|secondString|thirdString)`

true, if it does **not contain** the word "cdn" or the word "npm":
```
^(?!.*(cdn|npm)).*
```

true, if it **contains** the word "cdn" or "npm" AND simultaneousely it does **not contain** the word "google" or "bootstrap"
```
^(?!.*(google|bootstrap)).*(cdn|npm).*$
```
<hr>

## Begins with

true, if it **begins** with "https":
```
^(https).*
```

true, if it **begins** with "https" or "ftps":
```
^(https|ftps).*
```

true, if it does **not begin** with "https" or "ftps":
```
^(?!https|ftps).*
```
`?!` is called *negative lookahead*.

<hr>

## Ends with

true, if it **ends** with "css":
```
.*(css)$
```

true, if it **ends** with "css" or "js":
```
.*(css|js)$
```

true, if it does **not end** with "css" or "js"
```
.*(?<!css|js)$
```

`?<!` is called *negative lookbehind*, that's why it is different from the *negative lookahead*.

<hr>

## Notes

The `test` method of javascript regular expressions returns a result and moves a pointer on to after the match (Dim: so to capture the next result later). 

https://stackoverflow.com/questions/9275372/javascript-regex-should-pass-test-but-appears-to-fail-why
https://stackoverflow.com/questions/1520800/why-does-a-regexp-with-global-flag-give-wrong-results

Dim: So: **do not use** `/g` when using `test()` (so you can use it multiple times on the same regex/string. Alternatively, store the `test` result in a variable... ). But **do use** when using `match()` in order to capture all instanses of results... 

When testing with tools like https://regexr.com/, use `/gm` to test multiple times, one test per line...

