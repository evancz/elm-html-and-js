module Stamps where

import Color (..)
import Graphics.Collage (..)
import Graphics.Element (..)
import List
import List ((::))
import Mouse
import Signal (..)
import Text (..)
import Window

-- Import reset events from JS
port reset : Signal ()

-- Events can either be mouse clicks or reset events
events : Signal (Maybe (Int,Int))
events = merge (Just <~ sampleOn Mouse.clicks Mouse.position)
               (always Nothing <~ reset)

-- Keep a list of stamps, resetting when appropriate
clickLocations : Signal (List (Int,Int))
clickLocations =
    let update event locations = case event of
                                   Just loc -> loc :: locations
                                   Nothing  -> []
    in  foldp update [] events

-- Show the stamp list on screen
scene : (Int, Int) -> List (Int, Int) -> Element
scene (w,h) locs =
  let drawPentagon (x,y) =
          ngon 5 20 |> filled (hsla (toFloat x) 1 0.5 0.7)
                    |> move (toFloat x - toFloat w / 2, toFloat h / 2 - toFloat y)
                    |> rotate (toFloat x)
  in  layers [ collage w h (List.map drawPentagon locs)
             , plainText "Click to stamp a pentagon."
             ]

main = map2 scene Window.dimensions clickLocations

-- Export the number of stamps
port count : Signal Int
port count = List.length <~ clickLocations
