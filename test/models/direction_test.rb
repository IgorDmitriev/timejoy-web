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

require 'test_helper'

class DirectionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
