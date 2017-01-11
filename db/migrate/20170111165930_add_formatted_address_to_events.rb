class AddFormattedAddressToEvents < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :formatted_address, :string
  end
end
