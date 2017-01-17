class CreateCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :categories do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
      t.string :icon_id, default: 0

      t.timestamps
    end
    add_index :categories, :user_id
  end
end
