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

class User < ApplicationRecord
  validates :email, :session_token, presence: true, uniqueness: true
  validates_format_of :email, with: /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/
  validates :password_digest, presence: true
  validates :password, length: { minimum: 6 }, allow_nil: true
  validates :email, length: { minimum: 6 }

  has_many :events, dependent: :destroy
  has_many :favorite_places, dependent: :destroy
  # has_many :categories

  attr_reader :password

  after_initialize :ensure_session_token
  after_update :recalculate_future_calendar_events,
               if: "home_address_changed? || default_travel_mode_changed?"

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)
    user && user.is_password?(password) ? user : nil
  end

  def recalculate_future_calendar_events
    future_calendar_events = events.where('start_date > ?', DateTime.now)
    future_calendar_events.each(&:calculate_directions)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64(128)
    self.save
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64(128)
  end
end
