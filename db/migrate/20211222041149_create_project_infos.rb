class CreateProjectInfos < ActiveRecord::Migration[6.1]
  def change
    create_table :project_infos do |t|
      t.string :project_name
      t.integer :min_wordcount
      t.integer :max_wordcount
      t.string :email
      t.integer :del_flg, null: false, limit: 1, default: 0
      t.references :user, null: false, foreign_key: true
      t.integer :created_user, null: false
      t.integer :updated_user, null: false

      t.timestamps
    end
  end
end
