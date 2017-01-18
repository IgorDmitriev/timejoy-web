@icons.each do |icon|
  json.set! icon.id do
    json.id icon.id
    json.url icon.url
  end
end
