class AddColumnIssueStatusToTableCustomers < ActiveRecord::Migration[6.1]
  def change
    add_column :customers, :issue_status, :string
  end
end
