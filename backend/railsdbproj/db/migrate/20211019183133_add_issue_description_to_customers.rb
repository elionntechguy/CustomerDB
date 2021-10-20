class AddIssueDescriptionToCustomers < ActiveRecord::Migration[6.1]
  def change
    add_column :customers, :issue_description, :text
    change_column_default :customers, :issue_status, 'Opened'
  end
end
