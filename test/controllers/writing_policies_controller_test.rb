require "test_helper"

class WritingPoliciesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @writing_policy = writing_policies(:one)
  end

  test "should get index" do
    get writing_policies_url
    assert_response :success
  end

  test "should get new" do
    get new_writing_policy_url
    assert_response :success
  end

  test "should create writing_policy" do
    assert_difference('WritingPolicy.count') do
      post writing_policies_url, params: { writing_policy: { created_user: @writing_policy.created_user, del_flg: @writing_policy.del_flg, display_order: @writing_policy.display_order, template_description: @writing_policy.template_description, template_name: @writing_policy.template_name, update_user: @writing_policy.update_user } }
    end

    assert_redirected_to writing_policy_url(WritingPolicy.last)
  end

  test "should show writing_policy" do
    get writing_policy_url(@writing_policy)
    assert_response :success
  end

  test "should get edit" do
    get edit_writing_policy_url(@writing_policy)
    assert_response :success
  end

  test "should update writing_policy" do
    patch writing_policy_url(@writing_policy), params: { writing_policy: { created_user: @writing_policy.created_user, del_flg: @writing_policy.del_flg, display_order: @writing_policy.display_order, template_description: @writing_policy.template_description, template_name: @writing_policy.template_name, update_user: @writing_policy.update_user } }
    assert_redirected_to writing_policy_url(@writing_policy)
  end

  test "should destroy writing_policy" do
    assert_difference('WritingPolicy.count', -1) do
      delete writing_policy_url(@writing_policy)
    end

    assert_redirected_to writing_policies_url
  end
end
