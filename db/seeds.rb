# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

u1 = User.find_by(email: 'demo@timejoy.co')
u1.destroy if u1
u2 = User.find_by(email: 'demo2@timejoy.co').destroy
u2.destroy if u2

user = User
  .where(email: 'demo@timejoy.co')
  .first_or_create do |u|
    u.email = 'demo@timejoy.co'
    u.password = 'demoaccount'
  end

user.events << Event.create!(
  title: 'First User',
  start_date: Time.now,
  end_date: Time.now + 1.hours,
  address: '160 Spear Street')

20.times do
  h = rand(10)
  d = rand(3)
  start_date = Time.now + d.days + h.hours
  end_date = Time.now + d.days + (h + 1).hours

  user.events << Event.create( title: Faker::Hipster.sentence(3),
                               start_date: start_date,
                               end_date: end_date,
                               address: Faker::Address.street_address)
end

user2 = User.create(email: 'demo2@timejoy.co', password: 'demoaccount')

user2.events << Event.create!(
  title: 'Second User',
  start_date: Time.now,
  end_date: Time.now + 1.hours,
  address: '160 Spear Street')

10.times do
  h = rand(10)
  d = rand(3)
  start_date = Time.now + d.days + h.hours
  end_date = Time.now + d.days + (h + 1).hours

  user2.events << Event.create( title: Faker::Lorem.sentence(4),
                               start_date: start_date,
                               end_date: end_date,
                               address: Faker::Address.street_address)
end
