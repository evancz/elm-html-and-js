This project illustrates how to embed an Elm program in an HTML
page and how to communicate with JavaScript.

#### [See it in action!](http://evancz.github.io/elm-html-and-js)

After cloning the project, get it running on your
machine with the following commands:

    elm --only-js Stamps.elm
    open index.html

## Overview of API Usage

If you create an Elm module named `Stamps`, it will be named
`Elm.Stamps` in JavaScript. To instantiate a module you can
use any of the following functions:

```javascript
Elm.fullscreen(Elm.Stamps);   // take over the whole page
Elm.embed(Elm.Stamps, div);   // embed in a specific DOM node
Elm.worker(Elm.Stamps);       // instantiate without graphics
```

Each of these creates a module instance that you can communicate
with from JavaScript.

```javascript
// Embed the Stamps module in a div with ID 'elm-stamps'
var div = document.getElementById('elm-stamps');
var stamps = Elm.embed(Elm.Stamps, div);

// You can send and receive values through
// named channels, like 'reset' and 'count'.
stamps.send('reset', 42);
stamps.recv('count', function(event) {
    console.log(event.value);
});
```
Communication between Elm and JavaScript happens by sending events
along named channels, like `'reset'` and `'count'`. Elm interprets
these channels as signals and JavaScript interprets them as event streames.
In Elm, you declare channels with foreign event imports and exports:

```haskell
import JavaScript as JS

-- An imported event stream needs a default value.
foreign import jsevent "reset" (JS.fromInt 42)
    resets : Signal JS.JSNumber

foreign export jsevent "count"
    count : Signal JS.JSNumber
```

Values passed along named channels must be JavaScript values and
cannot be functions. You use the
[`JavaScript`](http://docs.elm-lang.org/library/JavaScript.elm)
and [`Json`](http://docs.elm-lang.org/library/Json.elm)
libraries to do conversions.
