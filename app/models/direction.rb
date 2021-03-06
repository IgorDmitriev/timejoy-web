# == Schema Information
#
# Table name: directions
#
#  id               :integer          not null, primary key
#  event_id         :integer
#  start_address    :string           not null
#  start_lat        :float
#  start_lng        :float
#  end_address      :string           not null
#  end_lat          :float
#  end_lng          :float
#  duration_value   :integer          not null
#  duration_text    :string
#  distance_value   :integer          not null
#  distance_text    :string
#  encoded_polyline :text             not null
#  departure_time   :datetime
#  arrival_time     :datetime
#  travel_mode      :string           default("driving")
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Direction < ApplicationRecord
  validates :start_address,
            :end_address,
            :duration_value,
            :distance_value,
            :encoded_polyline,
            presence: true

  after_initialize :request_directions_from_google,
                   unless: :encoded_polyline_present?

  belongs_to :event

  def request_directions_from_google
    return false unless start_address && end_address

    gmaps = GoogleMapsService::Client.new
    directions = gmaps.directions(
      start_address,
      end_address,
      mode: travel_mode,
      alternatives: false
    )

    return false unless directions[:status] == 'OK'

    map_google_directions_to_self(directions)
    true
  end

  private

  def map_google_directions_to_self(directions)
    route = directions[:routes][0][:legs][0]

    self.encoded_polyline = directions[:routes][0][:overview_polyline][:points]
    self.start_lat = route[:start_location][:lat]
    self.start_lng = route[:start_location][:lng]
    self.end_lat = route[:end_location][:lat]
    self.end_lng = route[:end_location][:lng]
    self.duration_value = route[:duration][:value]
    self.duration_text = route[:duration][:text]
    self.distance_value = route[:distance][:value]
    self.distance_text = route[:distance][:text]
  end

  def encoded_polyline_present?
    encoded_polyline.present?
  end
end
