class ChangeDefaultIconIdForCategory < ActiveRecord::Migration[5.0]
  def change
    change_column_default :categories, :icon_id, 1
  end
end
