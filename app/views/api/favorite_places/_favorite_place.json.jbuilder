json.extract! favorite_place,
              :id,
              :title,
              :description,
              :address,
              :formatted_address,
              :lat,
              :lng

json.set! :category do
  json.partial! 'api/categories/category',
                category: favorite_place.category
end
