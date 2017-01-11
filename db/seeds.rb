# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Event.create!(
  title: 'First event',
  start_date: Time.now,
  end_date: Time.now + 1.hours,
  address: '160 Spear Street')
Event.create!(
  title: 'Second event',
  start_date: Time.now + 2.hours,
  end_date: Time.now + 3.hours,
  address: '20 Silk Tree')
Event.create!(
  title: 'Third event',
  start_date: Time.now + 4.hours,
  end_date: Time.now + 5.hours,
  address: '1518 Pershing Drive')
Event.create!(
  title: 'Fourth event',
  start_date: Time.now + 6.hours,
  end_date: Time.now + 8.hours,
  address: '455 Market Street')
Event.create!(
  title: 'Fifth event',
  start_date: Time.now + 8.hours,
  end_date: Time.now + 9.hours,
  address: 'Berkeley, CA')
