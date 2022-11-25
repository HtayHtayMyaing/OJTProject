require "application_system_test_case"

class TemplateTypesTest < ApplicationSystemTestCase
  setup do
    @template_type = template_types(:one)
  end

  test "visiting the index" do
    visit template_types_url
    assert_selector "h1", text: "Template Types"
  end

  test "creating a Template type" do
    visit template_types_url
    click_on "New Template Type"

    fill_in "Created user", with: @template_type.created_user
    fill_in "Del flg", with: @template_type.del_flg
    fill_in "Template type", with: @template_type.template_type
    fill_in "Updated user", with: @template_type.updated_user
    click_on "Create Template type"

    assert_text "Template type was successfully created"
    click_on "Back"
  end

  test "updating a Template type" do
    visit template_types_url
    click_on "Edit", match: :first

    fill_in "Created user", with: @template_type.created_user
    fill_in "Del flg", with: @template_type.del_flg
    fill_in "Template type", with: @template_type.template_type
    fill_in "Updated user", with: @template_type.updated_user
    click_on "Update Template type"

    assert_text "Template type was successfully updated"
    click_on "Back"
  end

  test "destroying a Template type" do
    visit template_types_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Template type was successfully destroyed"
  end
end
