class CreateCustomers < ActiveRecord::Migration[6.1]
  def change
    create_table :customers do |t|
      t.string :username
      t.string :email
      t.string :phonenumber
      t.text :issues, array: true, index: { unique: true }, default: []
      t.integer :assignedusersid, array: true, index: { unique: true }, default: []

      t.timestamps
    end
  end
end
