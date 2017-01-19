class AddIconidColumnToCategory < ActiveRecord::Migration[5.0]
  def change
    add_column :categories, :icon_id, :integer, default: 1
  end
end
