class CreateIcons < ActiveRecord::Migration[5.0]
  def change
    create_table :icons do |t|
      t.text :url, null: false

      t.timestamps
    end
  end
end
