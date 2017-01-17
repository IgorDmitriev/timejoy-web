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

require 'test_helper'

class FavoritePlaceTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
