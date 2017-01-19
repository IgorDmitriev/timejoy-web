@favorite_places.each do |favorite_place|
  json.set! favorite_place.id do
    json.partial! 'api/favorite_places/favorite_place',
                  favorite_place: favorite_place
  end
end
