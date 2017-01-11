class CreateEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.string :title, null: false
      t.text :notes
      t.datetime :start_date, null: false
      t.datetime :end_date, null: false
      t.string :address
      t.float :lat
      t.float :lng

      t.timestamps
    end
    add_index :events, :start_date
    add_index :events, :end_date
    add_index :events, :address
    add_index :events, :lat
    add_index :events, :lng
  end
end
