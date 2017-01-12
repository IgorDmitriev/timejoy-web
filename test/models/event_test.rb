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

require 'test_helper'

class EventTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
