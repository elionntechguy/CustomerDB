class ChangeUsernameToNameCustomers < ActiveRecord::Migration[6.1]
  def change
    rename_column :customers, :username, :name
  end
end
