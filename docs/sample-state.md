```js
{
  currentUser: {
    id: 1,
    username: "app-academy",
    image_url: "image.png",
    default_travel_mode: "driving",
    home_address: "455 Market Street, San Francisco, CA",
    home_lat: "1412412414",
    home_lng: "123124124124"
  },
  forms: {
    signUp: {errors: []},
    logIn: {errors: []},
    createEvent: {errors: ["body can't be blank"]},
    createFavoritePlace : {errors: []}
  },
  events: {
    1: {
      title: "Sample Event",
      address: "160 Spear St, San Francisco, CA 94105, USA",
      lat: "37.791305",
      lng: "-122.3937352",
      start_date: "2017-01-05T00:30:00+0000",
      end_date: "2017-01-05T02:00:00+0000",
      directions: {
        event_id: 1,
        start_address: "455 Market Street, San Francisco, CA",
        start_lat: "13124",
        start_lng: "1412124",
        end_address: "160 Spear St, San Francisco, CA 94105, USA",
        end_lat: "37.791305",
        end_lng: "-122.3937352",
        travel_duration_value: 10,
        travel_duration_text: "10 mins",
        travel_distance_value: 1,
        travel_distance_text: "0.8 mi",
        travel_mode: "walking",
        encoded_polyline: "AP\\aB~AoDpDkCjC_DpDaKxJ_AfAo@bA{@`Be"
      }
      source_type: "calendar"
    }
  },
  favoritePlaces: {
    1: {
      title: "ARCO",
      category_id: 1,
      category: "Gaz stations",
      category_image_url: "image.png",
      address: "160 Spear St, San Francisco, CA 94105, USA",
      lat: "37.791305",
      lng: "-122.3937352",
      description: "very cheap"
    }
  }
  parkingOptions: {
    [eventId]: {
      1: {
        title: "Embr parking",
        address: "200 Spear St, San Francisco, CA 94105, USA",
        lat: "125125125",
        lng: "1241241",
        start_date: "2017-01-05T00:30:00+0000",
        end_date: "2017-01-05T00:30:00+0000",
        price: 15,
        price_formatted: "$15",
        event_id: 1,
        image_url: "parking.png",
        booking_url: "book.me"
      }
    }
  }
}
```
