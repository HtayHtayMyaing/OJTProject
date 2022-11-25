import React from "react";
import I18n from "i18n-js";
import "../../bundles/i18n/ja.js";

import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

import {
  UserOutlined,
  SettingOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import logo from "../../../../app/assets/images/logo.svg";
const { Sider } = Layout;
const { SubMenu } = Menu;

class SideBar extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  constructor(props) {
    super(props);
    const local = location.href.split("/");
    if (local[3] == "home" || local[3] == "") {
      localStorage.clear();
    } else {
      this.state = {
        menuKey: JSON.parse(localStorage.getItem("menuKey")) || [],
      };
    }
  }

  addKey = (key) => {
    this.setState(
      {
        menuKey: key,
      },
      () => {
        localStorage.setItem("menuKey", JSON.stringify(this.state.menuKey));
      }
    );
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={this.onCollapse}
        style={{ backgroundColor: "#53BF9D" }}
      >
        <div>
          <img
            src={logo}
            className="logo"
            alt="logo"
            style={{
              height: "64px",
              marginLeft: "1rem",
            }}
          />
        </div>
        <Menu
          //theme="dark"
          defaultSelectedKeys={[this.state.menuKey]}
          selectedKeys={[this.state.menuKey]}
          onClick={(e) => this.addKey(e.key)}
          mode="inline"
        >
          <>
            <SubMenu
              key="sub1"
              icon={<SettingOutlined />}
              title={I18n.t("home.menu1.title")}
            >
              <Menu.Item key="1">
                <Link to="/samples"> {I18n.t("home.menu1.side1")}</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/users"> {I18n.t("home.menu1.side2")}</Link>
              </Menu.Item>

              <Menu.Item key="3">
                <Link to="/groups"> {I18n.t("home.menu1.side3")}</Link>
              </Menu.Item>
            </SubMenu>
          </>
        </Menu>
      </Sider>
    );
  }
}

export default SideBar;
