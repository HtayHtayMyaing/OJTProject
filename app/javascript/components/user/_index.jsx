import React from "react";
import I18n from "i18n-js";
import "../../bundles/i18n/ja.js";

import {
  Breadcrumb,
  Form,
  Input,
  Button,
  Table,
  message,
  Popconfirm,
  Space,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";


class User extends React.Component {
  state = {
    users: [],
    searchText: "",
    searchedColumn: "",
  };

  componentDidMount() {
    this.loadUsers();
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  columns = [
    {
      title: I18n.t("user.id"),
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: I18n.t("user.name"),
      dataIndex: "user_name",
      key: "user_name",
      width: "40%",
      sorter: (a, b) => a.user_name.length - b.user_name.length,
      ...this.getColumnSearchProps("user_name"),
    },
    {
      title: I18n.t("user.action"),
      key: "action",
      render: (_text, record) => (
        <Space size="middle">
          <a onClick={() => this.editStatus(record)}>
            <EditOutlined />
          </a>
          <Popconfirm
            title="削除してもよろしいでしょうか？"
            onConfirm={() => this.deleteStatus(record)}
            okText="Yes"
            cancelText="No"
          >
            <a href="#" type="danger">
              <DeleteOutlined />{" "}
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  loadUsers = () => {
    const url = "/api/v1/user/index";
    console.log(url);
    fetch(url)
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error("Network error.");
      })
      .then((data) => {
        data.forEach((user) => {
          const newEl = {
            key: user.id,
            id: user.id,
            user_name: user.user_name,
          };

          this.setState((prevState) => ({
            users: [...prevState.users, newEl],
          }));
        });
      })
      .catch((err) => message.error("Error: " + err));
  };

  render() {
    return (
      <>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>User</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <Table
            className="table-striped-rows"
            dataSource={this.state.users}
            columns={this.columns}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </>
    );
  }
}

export default User;
