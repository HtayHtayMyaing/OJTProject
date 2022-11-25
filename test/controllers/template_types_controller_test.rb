require "test_helper"

class TemplateTypesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @template_type = template_types(:one)
  end

  test "should get index" do
    get template_types_url
    assert_response :success
  end

  test "should get new" do
    get new_template_type_url
    assert_response :success
  end

  test "should create template_type" do
    assert_difference('TemplateType.count') do
      post template_types_url, params: { template_type: { created_user: @template_type.created_user, del_flg: @template_type.del_flg, template_type: @template_type.template_type, updated_user: @template_type.updated_user } }
    end

    assert_redirected_to template_type_url(TemplateType.last)
  end

  test "should show template_type" do
    get template_type_url(@template_type)
    assert_response :success
  end

  test "should get edit" do
    get edit_template_type_url(@template_type)
    assert_response :success
  end

  test "should update template_type" do
    patch template_type_url(@template_type), params: { template_type: { created_user: @template_type.created_user, del_flg: @template_type.del_flg, template_type: @template_type.template_type, updated_user: @template_type.updated_user } }
    assert_redirected_to template_type_url(@template_type)
  end

  test "should destroy template_type" do
    assert_difference('TemplateType.count', -1) do
      delete template_type_url(@template_type)
    end

    assert_redirected_to template_types_url
  end
end
