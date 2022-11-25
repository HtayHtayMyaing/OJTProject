# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# Sample.create(description: 'test1', created_user: 1, updated_user: 1)
# Sample.create(description: 'test2', created_user: 1, updated_user: 1)
# Sample.create(description: 'test3', created_user: 1, updated_user: 1)
# Sample.create(description: 'test4', created_user: 1, updated_user: 1)
# Sample.create(description: 'test5', created_user: 1, updated_user: 1)
# Sample.create(description: 'test6', created_user: 1, updated_user: 1)
# Sample.create(description: 'test7', created_user: 1, updated_user: 1)
# Sample.create(description: 'test8', created_user: 1, updated_user: 1)
# Sample.create(description: 'test9', created_user: 1, updated_user: 1)
# Sample.create(description: 'test10', created_user: 1, updated_user: 1)
# Sample.create(description: 'test11', created_user: 1, updated_user: 1)
# Sample.create(description: 'test12', created_user: 1, updated_user: 1)

# UserLevel.create(user_level: '管理者', created_user: 1, updated_user: 1)
# UserLevel.create(user_level: 'フロント担当者', created_user: 1, updated_user: 1)
# UserLevel.create(user_level: '骨子作成リーダー', created_user: 1, updated_user: 1)
# UserLevel.create(user_level: '骨子作成者', created_user: 1, updated_user: 1)

# TemplateType.create(template_type: '記事の幅', created_user: 1, updated_user: 1)
# TemplateType.create(template_type: '記事の深さ', created_user: 1, updated_user: 1)
# TemplateType.create(template_type: '記事の読みやすさ', created_user: 1, updated_user: 1)
# TemplateType.create(template_type: '見出し詳細', created_user: 1, updated_user: 1)

# User.create(user_name: "Su", user_level_id: 1, del_flg:0, password: "123456", password_confirmation: "123456", created_user:0, updated_user:0, email:"admin@gmail.com", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil)
# User.create(user_name: "FrontUser", user_level_id: 2, del_flg:0, password: "123456", password_confirmation: "123456", created_user:0, updated_user:0, email:"front@gmail.com", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil)
# User.create(user_name: "groupleader", user_level_id: 3, del_flg:0, password: "123456", password_confirmation: "123456", created_user:0, updated_user:0, email:"groupleader@gmail.com", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil)
# User.create(user_name: "outlinecreator", user_level_id: 4, del_flg:0, password: "123456", password_confirmation: "123456", created_user:0, updated_user:0, email:"outlinecreator@gmail.com", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil)

# Group.create(group_name: 'group1', group_description: 'group',del_flg:1,created_user:1,updated_user: 1)
#Group.create(group_name: 'group2', group_description: 'group2 description',del_flg:1,created_user:1,updated_user: 1)
GroupUserSetting.create(group_id: 3, user_id: 1,del_flg:1,created_user:1,updated_user: 1)