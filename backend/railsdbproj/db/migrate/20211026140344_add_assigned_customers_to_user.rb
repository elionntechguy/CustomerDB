class AddAssignedCustomersToUser < ActiveRecord::Migration[6.1]
  def change
    # change_table(:users) do |t|
    #   t.integer :assignedusersid, array: true, index: { unique: true }, default: []
    # end
    add_column :users, :assignedcustomersid, :integer, array: true, index: { unique: true }, default: []
  end
end
