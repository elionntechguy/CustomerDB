class ChangeIndexToNotUniqueIssuesCustomer < ActiveRecord::Migration[6.1]
  def change
    remove_index :customers, :issues
    add_index :customers, :issues
  end
end
