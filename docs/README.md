# TimeJoy

[Heroku link][heroku]

[Trello link][trello]



[heroku]: http://timejoy.herokuapp.com/
[trello]: https://trello.com/b/yOayZOWF/timejoy-web

## Minimum Viable Product

TimeJoy integrates your calendar and map apps so you know exactly when and where you need to be.

TimeJoy Web is a web version built using Ruby on Rails as a backend API
and React/Redux for frontend.  By the end of Week 9, this app will, at a minimum, satisfy the
following criteria with smooth, bug-free navigation, adequate seed data and
sufficient CSS styling:

- [ ] Hosting on Heroku
- [ ] New account creation, login, and guest/demo login
- [ ] Managing User Profile and Settings (home location, office, travel mode)
- [ ] Calendar Events CRUD, display on map
- [ ] Build route for a day between calendar events with location, display directions on map
- [ ] Favorite Places CRUD, categories, display on map, add to route
- [ ] Search for Places like (gaz station, lunch, dinner, coffeshop) through API: Google Places, TripAdvisor, Yelp, Foursquare: add to favorites, display on map, add to route.
- [ ] Production README

Bonus:
- [ ] Sign in with Google
- [ ] Sync Calendar Events with Google Calendar
- [ ] Parking Options around meeting location: search through API, save, display on map, add to route
- [ ] Add Uber API as a travel mode to calculate travel time / cost
- [ ] Quantified self statistics (miles, total commute time, most popular location / area, most popular meeting partners)

## Design Docs
* [View Wireframes][wireframes]
* [React Components][components]
* [API endpoints][api-endpoints]
* [DB schema][schema]
* [Sample State][sample-state]

[wireframes]: ./wireframes/
[components]: ./component-hierarchy.md
[sample-state]: ./sample-state.md
[api-endpoints]: ./api-endpoints.md
[schema]: ./schema.md

## Implementation Timeline

### Phase 1: Backend setup and Front End User Authentication (8h)

**Objective:** Functioning rails project with front-end Authentication

### Phase 2: Calendar Events Model, API, components and Google Maps (20h)

**Objective:** Calendar Events can be created, read, edited and destroyed through
the API, components works well and styled, events with location display on google maps.

### Phase 3: Managing User Profile and Settings (4h)

**Objective:** Users can edit their profile information and settings

### Phase 4: Build a route for a day between calendar events with location (16h)

**Objective:** Calculate travel time between events with location, change travel mode, recalculate if something changed in logistic., display directions on Google Maps.

### Phase 5: Favorite Places (16h)

**Objective:** CRUD + Tags for favorite places. Users can toggle to display favorite places on map or not. Users can add favorite place to route.


### Bonus Features (TBD)

- [ ] Smart Favorite Places: Users can search for Gaz station, Lunch, Coffeeshop or other places near their event location or on the way. Uses one or several external API (Google Places, TripAdvisor, Yelp, Foursquare).
- [ ] Parking Options: Users can request search for parking around event location and see real-time options. They can choose them and add to the route. Uses ParkWhiz API.
- [ ] Sign in with Google
- [ ] Sync Calendar Events with Google Calendar
- [ ] Add Uber API as a travel mode to calculate travel time / cost
- [ ] KAYAK for parking - uses multiply parking API providers and display only best options
- [ ] Quantified self statistics (miles, total commute time, most popular location / area, most popular meeting partners)
