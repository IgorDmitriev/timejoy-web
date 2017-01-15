json.extract! event,
              :id,
              :title,
              :notes,
              :address,
              :formatted_address,
              :lat,
              :lng

json.startDate event.start_date
json.endDate event.end_date
