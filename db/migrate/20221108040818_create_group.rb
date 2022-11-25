class CreateGroup < ActiveRecord::Migration[7.0]
  def change
    create_table :groups do |t|
      t.string :group_name, limit: 255
      t.string :group_description, null: false, limit: 255
      t.integer :del_flg, limit: 1, default: 0
      t.integer :created_user
      t.timestamp :created_at
      t.integer :updated_user, null: false
      t.timestamp :updated_at, null: false
    end
  end
end
