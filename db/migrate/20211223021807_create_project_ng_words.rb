class CreateProjectNgWords < ActiveRecord::Migration[6.1]
  def change
    create_table :project_ng_words do |t|
      t.string :ng_word
      t.integer :del_flg, null: false, limit: 1, default: 0
      t.references :project_info, null: false, foreign_key: true
      t.integer :created_user, null: false
      t.integer :updated_user, null: false

      t.timestamps
    end
  end
end
