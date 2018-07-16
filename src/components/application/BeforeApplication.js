import React, { Component } from "react";
import { UsersContex } from "../../store";
import Application from "./Application";

class BeforeApplication extends Component {
  render() {
    return (
      <UsersContex.Consumer>
        {users => {
          return <Application userId={users.userId} phone={users.phone} />;
        }}
      </UsersContex.Consumer>
    );
  }
}

export default BeforeApplication;
