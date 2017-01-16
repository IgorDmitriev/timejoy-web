class Direction < ApplicationRecord
  validates :start_address,
            :end_address,
            :travel_duration_value,
            :travel_distance_value,
            :encoded_polyline,
            presence: true

  belongs_to :event
end
