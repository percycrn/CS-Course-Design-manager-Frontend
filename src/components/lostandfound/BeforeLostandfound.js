import React, { Component } from "react";
import { UsersContex } from "../../store";
import Lostandfound from "./Lostandfound";

class BeforeLostandfound extends Component {
  render() {
    return (
      <UsersContex.Consumer>
        {users => {
          return <Lostandfound userId={users.userId} phone={users.phone} />;
        }}
      </UsersContex.Consumer>
    );
  }
}

export default BeforeLostandfound;
