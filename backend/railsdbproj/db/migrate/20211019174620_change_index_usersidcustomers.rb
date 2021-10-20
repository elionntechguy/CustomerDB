class ChangeIndexUsersidcustomers < ActiveRecord::Migration[6.1]
  def change
    remove_index :customers, name: "index_customers_on_assignedusersid"
  end
end
