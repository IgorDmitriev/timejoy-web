class ChangeDataTypeIconIdColumnInCategory < ActiveRecord::Migration[5.0]
  def change
    remove_column :categories, :icon_id
  end
end
