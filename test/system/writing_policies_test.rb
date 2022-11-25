require "application_system_test_case"

class WritingPoliciesTest < ApplicationSystemTestCase
  setup do
    @writing_policy = writing_policies(:one)
  end

  test "visiting the index" do
    visit writing_policies_url
    assert_selector "h1", text: "Writing Policies"
  end

  test "creating a Writing policy" do
    visit writing_policies_url
    click_on "New Writing Policy"

    fill_in "Created user", with: @writing_policy.created_user
    fill_in "Del flg", with: @writing_policy.del_flg
    fill_in "Display order", with: @writing_policy.display_order
    fill_in "Template description", with: @writing_policy.template_description
    fill_in "Template name", with: @writing_policy.template_name
    fill_in "Update user", with: @writing_policy.update_user
    click_on "Create Writing policy"

    assert_text "Writing policy was successfully created"
    click_on "Back"
  end

  test "updating a Writing policy" do
    visit writing_policies_url
    click_on "Edit", match: :first

    fill_in "Created user", with: @writing_policy.created_user
    fill_in "Del flg", with: @writing_policy.del_flg
    fill_in "Display order", with: @writing_policy.display_order
    fill_in "Template description", with: @writing_policy.template_description
    fill_in "Template name", with: @writing_policy.template_name
    fill_in "Update user", with: @writing_policy.update_user
    click_on "Update Writing policy"

    assert_text "Writing policy was successfully updated"
    click_on "Back"
  end

  test "destroying a Writing policy" do
    visit writing_policies_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Writing policy was successfully destroyed"
  end
end
