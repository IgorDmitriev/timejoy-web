# == Schema Information
#
# Table name: events
#
#  id                :integer          not null, primary key
#  title             :string           not null
#  notes             :text
#  start_date        :datetime         not null
#  end_date          :datetime         not null
#  address           :string
#  lat               :float
#  lng               :float
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  formatted_address :string
#  user_id           :integer
#

class Event < ApplicationRecord
  validates :title, :start_date, :end_date, presence: true
  validate :correct_date_range

  belongs_to :user

  def correct_date_range
    if start_date.present? && end_date.present? && start_date > end_date
      errors.add(:start_date, "should be before end date")
    end
  end


  before_save :ensure_updated_address
  before_update :update_address, if: :address_changed?

  def ensure_updated_address
    update_address unless formatted_address
  end

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
