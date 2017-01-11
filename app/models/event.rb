class Event < ApplicationRecord
  validates :title, :start_date, :end_date, presence: true
  validate :correct_date_range

  def correct_date_range
    if start_date.present? && end_date.present? && start_date > end_date
      errors.add(:start_date, "should be before end date")
    end
  end


  after_initialize :update_address

  def update_address
    return unless address

    geocoder_response = Geocoder.search(address).first
    return unless geocoder_response

    self.formatted_address = geocoder_response.formatted_address
    self.lat = geocoder_response.geometry['location']['lat']
    self.lng = geocoder_response.geometry['location']['lng']

    true
  end
end
