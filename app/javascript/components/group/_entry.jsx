import React, { Component } from "react";
import I18n, { toHumanSize } from "i18n-js";
import "../../bundles/i18n/ja.js";
import { Breadcrumb, Button, Form, Input, Col, Row, Alert } from "antd";
import { UserOutlined } from "@ant-design/icons";

class groupEntry extends React.Component {
  state = {
    groups: [],
    searchText: "",
    searchedColumn: "",
  };
  formRef = React.createRef();

  //保存のため
  onFinish = (values) => {
    this.props.createGroup(values, this.formRef);
  };

  //保存失敗のため
  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //Form初期設定
  componentDidMount() {
    this.props.setForm(this.formRef);
  }

  render() {
    return (
      <>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Group</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 200, background: "#fff" }}
        >
          <Row>
            <Col span={12} offset={6}>
              {this.props.visible ? (
                <Alert
                  message={this.props.message}
                  type={this.props.messageType}
                  closable
                  afterClose={this.props.handleClose}
                  style={{ marginBottom: 10, textAlign: "center" }}
                />
              ) : null}
              <Form
                ref={this.formRef}
                name="control-ref"
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                labelCol={{
                  span: 5,
                }}
              >
                <Form.Item
                  label="グループ名:"
                  name="group_name"
                  rules={[
                    {
                      required: true,
                      message: I18n.t("message.M008"),
                      whitespace: true,
                    },
                  ]}
                >
                  <Input
                    defaultValue={this.props.formData.name}
                    maxLength={255}
                  />
                </Form.Item>
                <Form.Item
                  label="グループ概要:"
                  name="group_description"
                  rules={[
                    {
                      required: true,
                      message: I18n.t("message.M010"),
                      whitespace: true,
                    },
                  ]}
                >
                  <Input maxLength={255} />
                </Form.Item>
                <Form.Item name="id" hidden={true}>
                  <Input type="text" />
                </Form.Item>
                <Form.Item name="updated_user" hidden={true}>
                  <Input type="text" />
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    offset: 5,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    保存
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default groupEntry;
