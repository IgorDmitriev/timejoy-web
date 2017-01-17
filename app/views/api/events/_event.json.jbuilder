json.extract! event,
              :id,
              :title,
              :notes,
              :address,
              :formatted_address,
              :lat,
              :lng

json.startDate event.start_date.utc
json.endDate event.end_date.utc

json.set! :direction do
  json.partial! 'api/events/direction', direction: event.direction
end
