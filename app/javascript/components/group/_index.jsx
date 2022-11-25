import React from "react";
import I18n from "i18n-js";
import "../../bundles/i18n/ja.js";
import Entry from "./_entry.jsx";
import List from "./_list.jsx";
import { Layout, message } from "antd";

class Group extends React.Component {
  state = {
    groups: [],
    searchText: "",
    searchedColumn: "",
    group_name: "",
    group_description: "",
    editGroups: [],
    editStatus: false,
    message: "",
    messageType: "",
    visible: false,
  };
  formRef = React.createRef();

  //フォーム初期設定
  componentDidMount() {
    this.loadGroups();
  }

  // 取得グループデータ
  loadGroups = () => {
    const url = "/api/v1/group/index";
    fetch(url)
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error("Network error.");
      })
      .then((data) => {
        //エラーの場合エラーメッセージを表示する
        if (data.errStatus == "1") {
          if (data.message == "M075") {
            this.setState({
              message: "グループデータがありません。",
              messageType: "error",
              visible: true,
            });
          }
          //データ取得に失敗した場合、エラーメッセージを表示する。
          else if (data.message == "M060") {
            this.setState({
              message: "データ取得に失敗しました",
              messageType: "error",
              visible: true,
            });
          }
        } else {
          //データ取得が成功の場合
          data.groups.forEach((group) => {
            const newEl = {
              key: group.id,
              id: group.id,
              name: group.group_name,
              description: group.group_description,
            };
            this.setState((prevState) => ({
              groups: [...prevState.groups, newEl],
            }));
          });
        }
      })
      .catch((err) => message.error("Error: " + err));
  };

  //グループ更新するため
  editGroup = (values, currentForm) => {
    fetch(`/api/v1/group/update/${values.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((data) => {
        //更新が成功の場合成功メッセージを表示する
        if (data.ok) {
          return data.json();
        }
      })
      .then((data) => {
        //更新値を一覧に更新する
        if (data.editable != 0) {
          this.setState({
            message: I18n.t("message.M005"),
            messageType: "success",
            visible: true,
          });
          let ItemsCopy = [];
          let x = this.state.groups.map((entry) => {
            if (entry.id == data.groups.id) {
              entry.name = data.groups.group_name;
              entry.description = data.groups.group_description;
            }
            ItemsCopy.push(entry);
          });
          this.setState({ groups: ItemsCopy });
          this.updateItem(data.groups.id, data.groups);
        } else if (data.editable == 0) {
          //データ更新に失敗した場合、エラーメッセージを表示する。
          if (data.message == "M009") {
            this.setState({
              message: I18n.t("message.M009"),
              messageType: "error",
              visible: true,
            });
          }
          //グループ名が既にテーブル「group」にある場合警告メッセージを表示する。
          else if (data.message == "M058") {
            this.setState({
              message: I18n.t("message.M058"),
              messageType: "error",
              visible: true,
            });
          } else {
            //更新が失敗の場合エラーメッセージを表示する
            this.setState({
              message: "グループ名が存在しません。",
              messageType: "error",
              visible: true,
            });
          }
        }
      });
    //フォーム値を解除する。
    currentForm.current.resetFields();
  };

  //一覧に値を更新する
  updateItem(id, itemAttributes) {
    var index = this.state.groups.findIndex((x) => x.id === id);
    this.setState({
      groups: [
        ...this.state.groups.slice(0, index),
        Object.assign({}, this.state.groups[index], itemAttributes),
        ...this.state.groups.slice(index + 1),
      ],
    });
  }

  //保存とかこうしんのために
  actionNewOrEdit = (values, currentForm) => {
    if (values.id > 0) {
      this.editGroup(values, currentForm);
    } else {
      this.createGroup(values, currentForm);
    }
  };

  //データベースにグループデータを登録する
  createGroup = (values, currentForm) => {
    const url = "/api/v1/group/create";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
      })
      .then((data) => {
        //グループ名が既にある場合,エラーメッセージを表示される
        if (data.message == "M009") {
          this.setState({
            message: I18n.t("message.M009"),
            messageType: "error",
            visible: true,
          });
        } else if (data.message == "M056") {
          //データ登録に失敗した場合、エラーメッセージを表示される
          this.setState({
            message: I18n.t("message.M056"),
            messageType: "error",
            visible: true,
          });
        } else {
          //データ登録が成功する場合、新規行を登録する。
          const newEl = {
            key: data.groups.id,
            id: data.groups.id,
            name: data.groups.group_name,
            description: data.groups.group_description,
          };

          this.setState((prevState) => ({
            groups: [...prevState.groups, newEl],
          }));
          //聖子の場合、メッセージを表示する。
          this.setState({
            message: I18n.t("message.M004"),
            messageType: "success",
            visible: true,
          });
        }
      });
    //フォーム値を解除する。
    currentForm.current.resetFields();
  };

  //データを削除する
  deleteStatus = (e) => {
    fetch(`/api/v1/group/destroy/${e.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e),
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
      })
      .then((data) => {
        if (data.errStatus == "1") {
          if (data.message == "M074") {
            //削除が失敗の場合エラーメッセージをひょうじする
            this.setState({
              message: "グループidが存在しません。",
              messageType: "error",
              visible: true,
            });
          } else if ((data.message = "M059")) {
            //削除が失敗の場合エラーメッセージをひょうじする
            this.setState({
              message: I18n.t("message.M059"),
              messageType: "error",
              visible: true,
            });
          }
        } else {
          //削除が成功の後でメッセージを表示する
          this.setState({
            message: I18n.t("message.M007"),
            messageType: "success",
            visible: true,
          });
          //一覧で削除する
          this.removeGroupFromList(e.id);
        }
        //フォーム値を解除する。
        window.scrollTo(0, 0);
        this.formRef.current.resetFields();
      });
  };

  //更新の値をFormに設定する
  editStatus = (e) => {
    this.formRef.current.setFieldsValue({
      group_name: e.name,
      group_description: e.description,
      id: e.id,
    });
    this.setState({ editStatus: true });
    this.handleClose();
    window.scrollTo(0, 0);
  };

  //登録画面の設定
  setForm = (currentForm) => {
    this.formRef = currentForm;
  };

  //一覧でグループを削除
  removeGroupFromList(id) {
    const newGroup = this.state.groups.filter((group) => group.id !== id);
    this.setState({
      groups: newGroup,
    });
  }

  //メッセージを閉じる
  handleClose = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Entry
          createGroup={this.actionNewOrEdit}
          formData={this.state.editGroups}
          setForm={this.setForm}
          message={this.state.message}
          messageType={this.state.messageType}
          visible={this.state.visible}
          handleClose={this.handleClose}
          dataSource={this.state.groups}
        />
        <List
          dataSource={this.state.groups}
          deleteStatus={this.deleteStatus}
          editStatus={this.editStatus}
        />
      </Layout>
    );
  }
}

export default Group;
