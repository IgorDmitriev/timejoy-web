# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

## JSON API

### Users

- `POST /api/users`
- `PATCH /api/users`

### Session

- `POST /api/session`
- `DELETE /api/session`

### Events

- `GET /api/events`
  - accept params `start_date` and `end_date` and returns events for current user for this date range
- `POST /api/events`
- `GET /api/events/:id`
- `PATCH /api/events/:id`
- `DELETE /api/events/:id`

### Directions

- `GET /api/events/:id/directions`

### Places

- `GET /api/users/:id/favorite_places`
- `POST /api/users/:id/favorite_places`
  - create new place and make it favorite
- `PATCH /api/places/:id`
- `DELETE /api/places/:id`
- `GET /api/places/:category`
  - users for external search for places
  - accepts query string, category name, time-frame

### Parking Options

- `GET /api/events/:id/parking_options` 
