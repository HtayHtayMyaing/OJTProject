class AddUserNameLastToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :user_name_last, :string
  end
end
