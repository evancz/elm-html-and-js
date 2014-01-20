# HTML/JS integration &mdash; [live demo](http://evancz.github.io/elm-html-and-js)

This project illustrates how to embed an Elm program in an HTML
page and how to communicate with JavaScript.

### Build Instructions

    git clone https://github.com/evancz/elm-html-and-js.git
    cd elm-html-and-js
    elm --only-js Stamps.elm
    open index.html

### Overview of API Usage

If you create an Elm module named `Stamps`, it will be named
`Elm.Stamps` in JavaScript. To instantiate a module you can
use any of the following functions:

```javascript
Elm.fullscreen(Elm.Stamps, {reset:[]});   // take over the whole page
Elm.embed(Elm.Stamps, div, {reset:[]});   // embed in a specific DOM node
Elm.worker(Elm.Stamps,     {reset:[]});   // instantiate without graphics
```

Each of these creates a module instance that you can communicate
with from JavaScript.

```javascript
// Embed the Stamps module in a div with ID 'elm-stamps'
var div = document.getElementById('elm-stamps');
var stamps = Elm.embed(Elm.Stamps, div, {reset:[]});

// You can send and receive values through
// ports 'reset' and 'count'.
stamps.ports.reset.send([]);
stamps.ports.count.subscribe(function(event) {
    console.log(event.value);
});
```
Communication between Elm and JavaScript happens by sending events
throught ports, like `reset` and `count`. Elm interprets
these ports as signals and JavaScript interprets them as event streames.
In Elm, you declare ports like this:

```haskell
-- incoming reset events
port reset : Signal ()

-- outgoing count of stamps
port count : Signal Int
port count = length <~ stamps
```

Values passed along named channels must conform to [these
rules](http://elm-lang.org/learn/Ports.elm#customs-and-border-protection).
