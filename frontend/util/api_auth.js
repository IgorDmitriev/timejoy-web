export const signup = user => (
  $.ajax({
    method: 'POST',
    url: '/api/users',
    data: { user }
  })
);


export const login = user => (
  $.ajax({
    method: 'POST',
    url: '/api/session',
    data: { user }
  })
);

export const logout = () => (
  $.ajax({
    method: 'DELETE',
    url: '/api/session'
  })
);

export const updateSettings = settings => (
  $.ajax({
    method: 'PATCH',
    url: `/api/users/${settings.userId}`,
    data: { settings }
  })
);
