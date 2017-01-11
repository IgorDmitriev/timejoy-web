# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170111165930) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "events", force: :cascade do |t|
    t.string   "title",             null: false
    t.text     "notes"
    t.datetime "start_date",        null: false
    t.datetime "end_date",          null: false
    t.string   "address"
    t.float    "lat"
    t.float    "lng"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.string   "formatted_address"
    t.index ["address"], name: "index_events_on_address", using: :btree
    t.index ["end_date"], name: "index_events_on_end_date", using: :btree
    t.index ["lat"], name: "index_events_on_lat", using: :btree
    t.index ["lng"], name: "index_events_on_lng", using: :btree
    t.index ["start_date"], name: "index_events_on_start_date", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email"
    t.string   "timezone",            default: "UTC"
    t.string   "password_digest"
    t.string   "session_token"
    t.string   "image_url"
    t.string   "default_travel_mode", default: "driving"
    t.string   "home_address"
    t.float    "home_lat"
    t.float    "home_lng"
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  end

end
