class ChangeColumnNamesInDirection < ActiveRecord::Migration[5.0]
  def change
    rename_column :directions, :travel_duration_value, :duration_value
    rename_column :directions, :travel_duration_text, :duration_text
    rename_column :directions, :travel_distance_value, :distance_value
    rename_column :directions, :travel_distance_text, :distance_text
  end
end
