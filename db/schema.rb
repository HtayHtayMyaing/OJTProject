# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_11_23_040224) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "group_user_settings", force: :cascade do |t|
    t.integer "group_id"
    t.integer "user_id"
    t.integer "del_flg"
    t.integer "created_user"
    t.datetime "createdat"
    t.integer "updated_user"
    t.datetime "updatedat"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "groups", force: :cascade do |t|
    t.string "group_name", limit: 255
    t.string "group_description", limit: 255, null: false
    t.integer "del_flg", limit: 2, default: 0
    t.integer "created_user"
    t.datetime "created_at", precision: nil
    t.integer "updated_user", null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "header_classification_dicts", force: :cascade do |t|
    t.integer "display_order", null: false
    t.string "header_classification", limit: 255, null: false
    t.string "keyword", limit: 255, null: false
    t.integer "del_flg", limit: 2, default: 0, null: false
    t.integer "created_user", null: false
    t.integer "updated_user", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "project_infos", force: :cascade do |t|
    t.string "project_name"
    t.integer "min_wordcount"
    t.integer "max_wordcount"
    t.string "email"
    t.integer "del_flg", limit: 2, default: 0, null: false
    t.bigint "user_id", null: false
    t.integer "created_user", null: false
    t.integer "updated_user", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_project_infos_on_user_id"
  end

  create_table "project_ng_words", force: :cascade do |t|
    t.string "ng_word"
    t.integer "del_flg", limit: 2, default: 0, null: false
    t.bigint "project_info_id", null: false
    t.integer "created_user", null: false
    t.integer "updated_user", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_info_id"], name: "index_project_ng_words_on_project_info_id"
  end

  create_table "samples", force: :cascade do |t|
    t.string "description", limit: 255, null: false
    t.integer "del_flg", limit: 2, default: 0, null: false
    t.integer "created_user", null: false
    t.integer "updated_user", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "template_types", force: :cascade do |t|
    t.string "template_type", limit: 255, null: false
    t.integer "del_flg", limit: 2, default: 0, null: false
    t.integer "created_user", null: false
    t.integer "updated_user", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_levels", force: :cascade do |t|
    t.string "user_level", limit: 255, null: false
    t.integer "del_flg", limit: 2, default: 0, null: false
    t.integer "created_user", null: false
    t.integer "updated_user", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "user_name", limit: 255
    t.bigint "user_level_id", null: false
    t.integer "del_flg", limit: 2, default: 0, null: false
    t.integer "created_user", null: false
    t.integer "updated_user", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "user_name_last"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["user_level_id"], name: "index_users_on_user_level_id"
  end

  create_table "writing_policies", force: :cascade do |t|
    t.integer "display_order", null: false
    t.string "template_name", limit: 255, null: false
    t.string "template_description", limit: 255, null: false
    t.integer "del_flg", limit: 2, default: 0, null: false
    t.bigint "template_type_id", null: false
    t.integer "created_user", null: false
    t.integer "updated_user", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["template_type_id"], name: "index_writing_policies_on_template_type_id"
  end

  add_foreign_key "project_infos", "users"
  add_foreign_key "project_ng_words", "project_infos"
  add_foreign_key "users", "user_levels"
  add_foreign_key "writing_policies", "template_types"
end
