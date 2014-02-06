Elm.Stamps = Elm.Stamps || {};
Elm.Stamps.make = function (_elm)
                  {
                    _elm.Stamps = _elm.Stamps || {};
                    if (_elm.Stamps.values)
                    return _elm.Stamps.values;
                    var _N = Elm.Native,
                        _U = _N.Utils.make(_elm),
                        _L = _N.List.make(_elm),
                        _E = _N.Error.make(_elm),
                        _J = _N.JavaScript.make(_elm),
                        $moduleName = "Stamps";
                    var Basics = Elm.Basics.make(_elm);
                    var Color = Elm.Color.make(_elm);
                    var Graphics = Graphics || {};
                    Graphics.Collage = Elm.Graphics.Collage.make(_elm);
                    var Graphics = Graphics || {};
                    Graphics.Element = Elm.Graphics.Element.make(_elm);
                    var List = Elm.List.make(_elm);
                    var Maybe = Elm.Maybe.make(_elm);
                    var Mouse = Elm.Mouse.make(_elm);
                    var Native = Native || {};
                    Native.Ports = Elm.Native.Ports.make(_elm);
                    var Prelude = Elm.Prelude.make(_elm);
                    var Signal = Elm.Signal.make(_elm);
                    var String = Elm.String.make(_elm);
                    var Text = Elm.Text.make(_elm);
                    var Time = Elm.Time.make(_elm);
                    var Window = Elm.Window.make(_elm);
                    var _op = {};
                    var scene = F2(function (_v0,locs)
                                   {
                                     return function ()
                                            {
                                              switch (_v0.ctor)
                                              {case
                                               "_Tuple2" :
                                                 return function ()
                                                        {
                                                          var drawPentagon = function (_v4)
                                                                             {
                                                                               return function ()
                                                                                      {
                                                                                        switch (_v4.ctor)
                                                                                        {case
                                                                                         "_Tuple2" :
                                                                                           return Graphics.Collage.rotate(Basics.toFloat(_v4._0))(Graphics.Collage.move({ctor: "_Tuple2", _0: Basics.toFloat(_v4._0) - Basics.toFloat(_v0._0) / 2, _1: Basics.toFloat(_v0._1) / 2 - Basics.toFloat(_v4._1)})(Graphics.Collage.filled(A4(Color.hsva,
                                                                                                                                                                                                                                                                                                                                        Basics.toFloat(_v4._0),
                                                                                                                                                                                                                                                                                                                                        1,
                                                                                                                                                                                                                                                                                                                                        1,
                                                                                                                                                                                                                                                                                                                                        0.7))(A2(Graphics.Collage.ngon,
                                                                                                                                                                                                                                                                                                                                                 5,
                                                                                                                                                                                                                                                                                                                                                 20))));}
                                                                                        _E.Case($moduleName,
                                                                                                "between lines 24 and 26");
                                                                                      }();
                                                                             };
                                                          return Graphics.Element.layers(_J.toList([A3(Graphics.Collage.collage,
                                                                                                       _v0._0,
                                                                                                       _v0._1,
                                                                                                       A2(List.map,
                                                                                                          drawPentagon,
                                                                                                          locs)),
                                                                                                    Text.plainText("Click to stamp a pentagon.")]));
                                                        }();}
                                              _E.Case($moduleName,"between lines 23 and 28");
                                            }();
                                   });
                    var reset = Native.Ports.portIn("reset",
                                                    Native.Ports.incomingSignal(function (v)
                                                                                {
                                                                                  return typeof v === "object" && v instanceof Array ? {ctor: "_Tuple0"} : _E.raise("invalid input, expecting JSArray but got " + v);
                                                                                }));
                    var events = A2(Signal.merge,
                                    A2(Signal._op["<~"],
                                       Maybe.Just,
                                       A2(Signal.sampleOn,Mouse.clicks,Mouse.position)),
                                    A2(Signal._op["<~"],Basics.always(Maybe.Nothing),reset));
                    var clickLocations = function ()
                                         {
                                           var update = F2(function (event,locations)
                                                           {
                                                             return function ()
                                                                    {
                                                                      switch (event.ctor)
                                                                      {case
                                                                       "Just" :
                                                                         return {ctor: "::", _0: event._0, _1: locations};
                                                                       case
                                                                       "Nothing" :
                                                                         return _J.toList([]);}
                                                                      _E.Case($moduleName,
                                                                              "between lines 16 and 19");
                                                                    }();
                                                           });
                                           return A3(Signal.foldp,update,_J.toList([]),events);
                                         }();
                    var main = A3(Signal.lift2,scene,Window.dimensions,clickLocations);
                    var count = Native.Ports.portOut("count",
                                                     Native.Ports.outgoingSignal(function (v)
                                                                                 {
                                                                                   return _J.fromInt(v);
                                                                                 }),
                                                     A2(Signal._op["<~"],
                                                        List.length,
                                                        clickLocations));
                    _elm.Stamps.values = {_op: _op, events: events, clickLocations: clickLocations, scene: scene, main: main};
                    return _elm.Stamps.values;
                  };
