import React from "react";
import User from "../user/_index";
import Sample from "../sample/_index";
import Group from "../group/_index";
import { Route, Switch } from "react-router-dom";
import { Alert } from "antd";
import I18n from "i18n-js";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          path="/home"
          render={() => (
            <div
              style={{
                marginLeft: 25,
                marginRight: 25,
                marginTop: 25,
                paddingBottom: 20,
                paddingLeft: 50,
              }}
            >
              <Alert
                className="alert-message-style"
                message={I18n.t("message." + this.props.message)}
                type="error"
              />
            </div>
          )}
        ></Route>
        <Route path="/users" component={User}></Route>
        <Route path="/samples" component={Sample}></Route>
        <Route path="/logout" component="Logout"></Route>
        <Route path="/groups" component={Group}></Route>
      </Switch>
    );
  }
}

export default Routes;
