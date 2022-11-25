import React, { Component } from "react";
import I18n from "i18n-js";
import "../../bundles/i18n/ja.js";
import { Button, Input, Table, Space, Popconfirm, Tooltip } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Item from "antd/lib/list/Item.js";

class listGroup extends Component {
  state = {
    groups: [],
    searchText: "",
    searchedColumn: "",
  };

  //検索のグループ名
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

  //テーブル検索のため
  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  //検索条件を解除
  handleReset = (clearFilters) => {
    clearFilters();
  };

  render() {
    const columns = [
      {
        title: "番号",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "番号",
        dataIndex: "sr",
        key: "sr",
        render: (text, record) => this.props.dataSource.indexOf(record) + 1,
        align: "center",
      },
      {
        title: "グループ名",
        dataIndex: "name",
        key: "name",
        width: "40%",
        sorter: (a, b) => a.name.localeCompare(b.name),
        ...this.getColumnSearchProps("name"),
      },
      {
        title: "グループ概要",
        dataIndex: "description",
        key: "description",
        width: "40%",
        sorter: (a, b) => a.description.localeCompare(b.description),
      },
      {
        title: "操作",
        key: "action",
        align: "center",
        render: (_text, record) => (
          <Space size="middle">
            <Tooltip placement="topLeft" title="更新" color="blue">
              <a onClick={() => this.props.editStatus(record)}>
                <EditOutlined style={{ color: "#4E89FF" }} />
              </a>
            </Tooltip>

            <Popconfirm
              title={I18n.t("message.M006")}
              onConfirm={() => this.props.deleteStatus(record)}
              okText="Yes"
              cancelText="No"
            >
              <Tooltip placement="topLeft" title="削除" color="blue">
                <a href="#" type="danger">
                  <DeleteOutlined />{" "}
                </a>
              </Tooltip>
            </Popconfirm>
          </Space>
        ),
      },
    ].filter((col) => col.dataIndex !== "id");
    return (
      <>
        <Table
          bordered
          style={{ marginTop: 10, color: "blue" }}
          className="table-striped-rows"
          dataSource={this.props.dataSource}
          columns={columns}
          pagination={{
            pageSize: 10,
            showTotal: (total, range) =>
              `${total}件の中から${range[0]}から${range[1]}を表示`,
          }}
          total={this.props.dataSource.length}
        ></Table>
      </>
    );
  }
}

export default listGroup;
