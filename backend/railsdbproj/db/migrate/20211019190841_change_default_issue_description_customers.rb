class ChangeDefaultIssueDescriptionCustomers < ActiveRecord::Migration[6.1]
  def change
    change_column_default :customers, :issue_description, '//'
  end
end
