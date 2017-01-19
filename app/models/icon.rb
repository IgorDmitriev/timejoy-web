# == Schema Information
#
# Table name: icons
#
#  id         :integer          not null, primary key
#  url        :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Icon < ApplicationRecord
  validates :url, presence: true
end
