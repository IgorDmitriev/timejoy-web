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
  has_one :direction

  def correct_date_range
    if start_date.present? && end_date.present? && start_date > end_date
      errors.add(:start_date, "should be before end date")
    end
  end

  before_create :ensure_updated_address
  after_create :include_new_event_in_route, if: :formatted_address_present?

  before_update :update_address, if: :address_changed?

  after_destroy :analyze_next_event, if: :formatted_address_present?

  def analyze_next_event
    next_event.calculate_directions
  end

  def ensure_updated_address
    update_address unless formatted_address
  end

  def update_address
    return false unless address

    geocoder_response = Geocoder.search(address).first
    unless geocoder_response
      self.formatted_address = nil
      self.lat = nil
      self.lng = nil

      return false
    end

    self.formatted_address = geocoder_response.formatted_address
    self.lat = geocoder_response.geometry['location']['lat']
    self.lng = geocoder_response.geometry['location']['lng']

    true
  end

  def calculate_directions
    # TODO set initial location to home/work if user has home/work address
    self.direction = nil && return unless previous_event

    new_direction =
      Direction.new(
        start_address: previous_event.formatted_address,
        end_address: formatted_address
      )

    self.direction = new_direction.encoded_polyline ? new_direction : nil
  end

  def include_new_event_in_route
    calculate_directions

    # TODO set last location to home/work if user has home/work address
    return unless next_event

    return if next_event.direction &&
      next_event.direction.start_address == formatted_address

    new_direction_for_next_event =
      Direction.new(
        start_address: formatted_address,
        end_address: next_event.formatted_address
      )

    next_event.direction =
      if new_direction_for_next_event.encoded_polyline
        new_direction_for_next_event
      end

  end

  def previous_event
    @previous_event ||=
      Event
        .where(user_id: user.id,
               start_date: (start_date.beginning_of_day)..(start_date - 1))
        .where.not(formatted_address: nil)
        .sort_by(&:start_date)
        .last
  end

  def next_event
    @next_event ||=
      Event
        .where(user_id: user.id,
               start_date: (start_date + 1)..(start_date.end_of_day))
        .where.not(formatted_address: nil)
        .sort_by(&:start_date)
        .first
  end

  def current_day
    [start_date.beginning_of_day, start_date.end_of_day]
  end

  def formatted_address_present?
    formatted_address.present?
  end
end
