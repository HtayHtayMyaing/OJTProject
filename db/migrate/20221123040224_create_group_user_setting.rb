class CreateGroupUserSetting < ActiveRecord::Migration[7.0]
  def change
    create_table :group_user_settings do |t|
      t.integer :group_id 
      t.integer :user_id
      t.integer :del_flg
      t.integer :created_user
      t.datetime :createdat
      t.integer :updated_user
      t.datetime :updatedat

      t.timestamps
    end
  end
end
