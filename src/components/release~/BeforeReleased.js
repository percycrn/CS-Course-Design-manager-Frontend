import React, { Component } from "react";
import { UsersContex } from "../../store";
import Released from "./Released";

class BeforeReleased extends Component {
  render() {
    return (
      <UsersContex.Consumer>
        {users => {
          return <Released userId={users.userId} />;
        }}
      </UsersContex.Consumer>
    );
  }
}

export default BeforeReleased;
