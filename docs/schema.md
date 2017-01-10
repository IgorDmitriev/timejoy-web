# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, indexed, unique
timezone        | string    | not null
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
image_url       | string    |
default_travel_mode | string | default: driving
home_address | string |
home_lat | float |
home_lng | float |


## events
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key, unique
title       | string    | not null
notes       | text      |
start_date  | datetime  | not null, indexed
end_date    | datetime  | not null, indexed
address     | string    | indexed
lat         | float     | indexed
lng         | float     | indexed
directions_id   | integer   | not null, foreign key, indexed
selected_parking_id   | integer   | not null, foreign key, indexed
type | string | not null ['calendar', 'place']


## event_participants
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key, unique
event_id    | integer   | not null, foreign key, indexed
participant_id | string  | not null, foreign key, indexed

## participants
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key, unique
name    | integer   | not null, foreign key, indexed
image_url | string |
email | string | not null, unique, indexed


## directions
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key, unique
event_id | integer | not null, foreign key, index
start_address | string | not null
start_lat | float |
start_lng | float |
end_address | string | not null
end_lat | float |
end_lng | float |
travel_duration_value | integer |
travel_duration_text | string |
travel_distance_text | string |
travel_distance_value | integer |
encoded_polyline | text |
departure_time | datetime |
arrival_time | datetime |
travel_mode | string | default: driving


## favorite places
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key, unique
user_id     | integer   | not null, foreign key, index
place_id    | integer   | not null, foreign key, index

## places
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key, unique
title | string | not null
description | text |
category_id | integer | not null, default: other
address | string | not null
lat | float |
lng | float |

## categories
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key, unique
user_id | integer | not null
title | string | not null
image_url | string | not null

## places <-> categories
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key, unique
place_id | integer | not null, foreign key, indexed
category_id | integer | not null, foreign key, indexed

## parking options
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key, unique
title | string | not null
address | string | not null
lat | float | not null
lng | float | not null
start_date | datetime | not null
end_date | datetime | not null
price | integer | not null
price_formatted | string | not null
event_id | integer | not null, foreign key
image_url | string |
booking_url | string |
