## Component Hierarchy

**AuthFormContainer**
  - AuthForm

**RootContainer**
  - DayViewContainer
    + FavoritePlacesContainer
    + EventFormContainer
    + FavoritePlaceFormContainer
    + SearchResultsContainer
    + ParkingOptionsContainer
  - MapContainer

**DayViewContainer**
  - NavBar
  - CalendarContainer

**CalendarContainer**
  * EventContainer
  * AddButton

**EventContainer**
  - TravelTime
  - ChangeTravelModeButton
  - Title
  - DateTime
  - Address
  - Participants

**MapContainer**
* EventCallout
* Directions
  - Polyline
  - Callout

**FavoritePlacesContainer**
  - PlaceIndex

**PlaceIndex**
  * PlaceItem

**PlaceItem**
  - AddToCalendar

**EventFormContainer**
  - EventForm

**FavoritePlaceFormContainer**
  - FavoritePlaceForm

**SearchResultsContainer**
  - Search
  - PlaceIndex

**ParkingOptionsContainer**
  * ParkingOptionItem

**ParkingOptionItem**
  - AddToCalendar


## Routes

|Path   | Component   |
|-------|-------------|
| "/sign-up" | "AuthFormContainer" |
| "/sign-in" | "AuthFormContainer" |
| "/" | "RootContainer" |
| "/events/:eventId" | "EventContainer" |
