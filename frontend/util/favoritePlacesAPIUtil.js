export const fetchFavoritePlaces = () => (
  $.ajax({
    method: 'GET',
    url: 'api/favorite_places'
  })
);

export const fetchFavoritePlace = id => (
  $.ajax({
    method: 'GET',
    url: `api/favorite_places/${id}`
  })
);

export const createFavoritePlace = favoritePlace => {
  return $.ajax({
    method: 'POST',
    url: 'api/favorite_places',
    data: { favoritePlace }
  });
};


export const updateFavoritePlace = favoritePlace => (
  $.ajax({
    method: 'PATCH',
    url: `api/favorite_places/${favoritePlace.id}`,
    data: { favoritePlace }
  })
);

export const deleteFavoritePlace = id => (
  $.ajax({
    method: 'DELETE',
    url: `api/favorite_places/${id}`
  })
);
