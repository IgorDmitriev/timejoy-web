class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :email
      t.string :timezone, default: "UTC"
      t.string :password_digest
      t.string :session_token
      t.string :image_url
      t.string :default_travel_mode, default: "driving"
      t.string :home_address
      t.float :home_lat
      t.float :home_lng

      t.timestamps
    end
    add_index :users, :email, unique: true
    add_index :users, :session_token, unique: true
  end
end
