# == Schema Information
#
# Table name: users
#
#  id                  :integer          not null, primary key
#  email               :string
#  timezone            :string           default("UTC")
#  password_digest     :string
#  session_token       :string
#  image_url           :string
#  default_travel_mode :string           default("driving")
#  home_address        :string
#  home_lat            :float
#  home_lng            :float
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
