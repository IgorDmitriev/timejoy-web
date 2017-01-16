return nil if direction.nil?

json.eventId direction.event_id
json.startAddress direction.start_address
json.endAddress direction.end_address
json.encodedPolyline direction.encoded_polyline
json.travelMode direction.travel_mode

json.durationValue direction.duration_value
json.durationText direction.duration_text
