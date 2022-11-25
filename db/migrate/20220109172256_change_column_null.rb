class ChangeColumnNull < ActiveRecord::Migration[6.1]
  def change
    change_column_null :users, :user_name, :string, null: true
  end
end
