This project illustrates how to embed an Elm program in an HTML
page and how to communicate with JavaScript.

Communication between Elm and JS happens with events.
Signals can be exported as event streams, and event streams
can be imported as signals.

Values passed must be JavaScript values and cannot be functions.
Use the [`JavaScript`](http://docs.elm-lang.org/library/JavaScript.elm)
and [`Json`](http://docs.elm-lang.org/library/Json.elm)
libraries to convert values.
These requirements decouple the language from the particulars
of its implementation and makes it impossible to sneak in impure
functions.

## In JavaScript

Once you initialize an Elm module, you can talk to it with
the `send` and `recv` functions. To initialize an Elm module
named `MyModule` without any graphics, you use the `Elm.worker`
function:

```javascript
var myModule = Elm.worker(Elm.MyModule);
```

The following code sends values 3, 4, and 5 to the initialized
module. The module will receive these values as a signal
if you declare a foreign import named number:
`foreign import jsevent "number"`.

```javascript
myModule.send('number', 3);
myModule.send('number', 4);
myModule.send('number', 5);
```

The following code receives values from `myModule` and logs them.
You must declare a foreign export to expose a signal as a stream
of events: `foreign export jsevent "logPlease"`

```javascript
myModule.recv('logPlease', function(event) {
    console.log(event.value);
});
```

## In Elm



```haskell
module MyModule where

import JavaScript as JS
import JavaScript (JSInt)

foreign import jsevent "number" (JS.fromInt 0)
    numbers : Signal JSInt

square : Int -> Int
square n = n^2

squaredNumbers = lift (JS.fromInt . square . JS.toInt) numbers

foreign export jsevent "logPlease"
    squaredNumbers : Signal JSInt
```

|]
