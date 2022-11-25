import React from "react";
import Routes from "../routes/_index";

import { Layout } from "antd";
const { Header, Content } = Layout;

class Body extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, backgroundColor: "#53BF9D" }}
        />
        <Content style={{ margin: "0 16px" }}>
          <Routes message={this.props.message} />
        </Content>
      </Layout>
    );
  }
}

export default Body;
