export const fetchEvents = (startDate, endDate) => (
  $.ajax({
    method: 'GET',
    url: 'api/events',
    data: {
      startDate,
      endDate
    }
  })
);

export const fetchEvent = id => (
  $.ajax({
    method: 'GET',
    url: `api/events/${id}`
  })
);

export const createEvent = event => {
  return $.ajax({
    method: 'POST',
    url: 'api/events',
    data: { event }
  });
};


export const updateEvent = event => (
  $.ajax({
    method: 'PATCH',
    url: `api/events/${event.id}`,
    data: { event }
  })
);

export const deleteEvent = id => (
  $.ajax({
    method: 'DELETE',
    url: `api/events/${id}`
  })
);
