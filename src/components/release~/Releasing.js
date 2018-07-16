import React, { Component } from "react";
import { Breadcrumb } from "antd";
import ReleasingForm from "./ReleasingForm";
import { UsersContex } from "../../store";

class Releasing extends Component {
  render() {
    return (
      <UsersContex.Consumer>
        {users => {
          console.log("users:" + users);
          return (
            <div>
              <Breadcrumb className="App-breadcrumb">
                <Breadcrumb.Item>HomePage</Breadcrumb.Item>
                <Breadcrumb.Item>
                  <span style={{ fontWeight: "bold" }}>Releasing</span>
                </Breadcrumb.Item>
              </Breadcrumb>
              <div className="App-content">
                <div style={{ display: "flex", padding: "4px 16px 0px 16px" }}>
                  <div className="App-title" id="title">
                    Release Now!
                  </div>
                </div>
                <div style={{ padding: "0px 100px 16px 16px" }}>
                  <ReleasingForm phone={users.phone} />
                </div>
              </div>
            </div>
          );
        }}
      </UsersContex.Consumer>
    );
  }
}

export default Releasing;
