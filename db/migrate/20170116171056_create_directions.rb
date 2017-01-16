class CreateDirections < ActiveRecord::Migration[5.0]
  def change
    create_table :directions do |t|
      t.integer :event_id
      t.string :start_address, null: false
      t.float :start_lat
      t.float :start_lng
      t.string :end_address, null: false
      t.float :end_lat
      t.float :end_lng
      t.integer :travel_duration_value, null: false
      t.string :travel_duration_text
      t.integer :travel_distance_value, null: false
      t.string :travel_distance_text
      t.text :encoded_polyline, null: false
      t.datetime :departure_time
      t.datetime :arrival_time
      t.string :travel_mode, default: 'driving'

      t.timestamps
    end
    add_index :directions, :event_id
    add_index :directions, :start_address
    add_index :directions, :end_address
  end
end
