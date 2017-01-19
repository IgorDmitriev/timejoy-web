# == Schema Information
#
# Table name: categories
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  icon_id    :integer          default("1")
#

class Category < ApplicationRecord
  validates :title, :icon, presence: true

  belongs_to :icon
  # belongs_to :user
end
