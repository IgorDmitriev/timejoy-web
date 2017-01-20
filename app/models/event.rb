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
  after_create :include_in_route, if: :formatted_address_present?

  before_update :update_address, if: :address_changed?
  after_update :handle_update

  after_destroy :analyze_next_event, if: :formatted_address_present?

  def analyze_next_event
    next_event.calculate_directions if next_event
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

  def handle_update
    # debugger
    calculate_directions
    new_next_event = get_next_event
    new_next_event.calculate_directions if new_next_event
  end

  def calculate_directions
    return self.direction = nil if previous_event.nil? && user.home_address.nil?

    previous_event_address =
      if previous_event
        previous_event.formatted_address
      else
        user.home_address
      end

    return if direction &&
      direction.start_address == previous_event_address &&
      direction.end_address == formatted_address &&
      direction.travel_mode == user.default_travel_mode

    new_direction =
      Direction.new(
        start_address: previous_event_address,
        end_address: formatted_address,
        travel_mode: user.default_travel_mode
      )

    self.direction = new_direction.encoded_polyline ? new_direction : nil
  end

  def include_in_route
    calculate_directions

    # TODO set last location to home/work if user has home/work address
    return unless next_event

    next_event.calculate_directions
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
    @next_event ||= get_next_event
  end

  def get_next_event
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
