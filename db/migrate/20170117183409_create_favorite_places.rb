class CreateFavoritePlaces < ActiveRecord::Migration[5.0]
  def change
    create_table :favorite_places do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
      t.text :description
      t.integer :category_id, null: false
      t.string :address, null: false
      t.string :formatted_address, null: false
      t.float :lat, null: false
      t.float :lng, null: false

      t.timestamps
    end
    add_index :favorite_places, :user_id
    add_index :favorite_places, :title
    add_index :favorite_places, :category_id
    add_index :favorite_places, :address
    add_index :favorite_places, :lat
  end
end
