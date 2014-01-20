module Stamps where

import Mouse
import Window

-- Import reset events from JS
port reset : Signal ()

-- Events can either be mouse clicks or reset events
events : Signal (Maybe (Int,Int))
events = merge (Just <~ sampleOn Mouse.clicks Mouse.position)
               (always Nothing <~ reset)

-- Keep a list of stamps, reseting when appropriate
clickLocations =
    let update event locations = case event of
                                   Just loc -> loc :: locations
                                   Nothing  -> []
    in  foldp update [] events

-- Show the stamp list on screen
scene (w,h) locs =
  let drawPentagon (x,y) =
          ngon 5 20 |> filled (hsva (toFloat x) 1 1 0.7)
                    |> move (toFloat x - toFloat w / 2, toFloat h / 2 - toFloat y)
                    |> rotate (toFloat x)
  in  layers [ collage w h (map drawPentagon locs)
             , plainText "Click to stamp a pentagon." ]

main = lift2 scene Window.dimensions clickLocations

-- Export the number of stamps
port count : Signal Int
port count = length <~ clickLocations