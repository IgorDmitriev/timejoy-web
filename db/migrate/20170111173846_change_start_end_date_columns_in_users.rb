class ChangeStartEndDateColumnsInUsers < ActiveRecord::Migration[5.0]
  def change
    change_column_null :events, :start_date, true
    change_column_null :events, :end_date, true
  end
end
