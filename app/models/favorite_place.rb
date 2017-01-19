# == Schema Information
#
# Table name: favorite_places
#
#  id                :integer          not null, primary key
#  user_id           :integer
#  title             :string
#  description       :text
#  category_id       :integer
#  address           :string
#  formatted_address :string
#  lat               :float
#  lng               :float
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

class FavoritePlace < ApplicationRecord
  validates :user, :title, :category, :address,
            :formatted_address, :lat, :lng,
            presence: true

  belongs_to :user
  belongs_to :category

  before_validation :ensure_updated_address

  def ensure_updated_address
    update_address unless formatted_address
  end

  def update_address
    return false unless address

    geocoder_response = Geocoder.search(address).first
    unless geocoder_response
      self.formatted_address = nil
      self.lat = nil
      self.lng = nil

      return false
    end

    self.formatted_address = geocoder_response.formatted_address
    self.lat = geocoder_response.geometry['location']['lat']
    self.lng = geocoder_response.geometry['location']['lng']

    true
  end
end
