import React, { Component } from "react";
import { Input, Breadcrumb, List } from "antd";
import AppItem from "./AppItem";
import axios from "axios";

const Search = Input.Search;
class Application extends Component {
  state = {
    data: []
  };

  allApps() {
    axios.get("/apps").then(({ data }) => {
      this.setState({ data: data });
    });
  }

  componentWillMount() {
    this.allApps();
  }

  render() {
    return (
      <div>
        <Breadcrumb className="App-breadcrumb">
          <Breadcrumb.Item>HomePage</Breadcrumb.Item>
          <Breadcrumb.Item>
            <span style={{ fontWeight: "bold" }}>Application</span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="App-content">
          <div style={{ display: "flex", padding: "4px 16px 0px 16px" }}>
            <div className="App-title" id="title">
              List of application items
            </div>
            <div className="App-search">
              <Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
                style={{ width: "300px", marginLeft: "16px", height: "30px" }}
              />
            </div>
          </div>
          <div style={{ padding: "0px 16px 16px 16px" }}>
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              dataSource={this.state.data}
              pagination={{
                position: "bottom",
                pageSize: 6,
                size: "small"
              }}
              renderItem={item => (
                <AppItem
                  data={item}
                  handleAppRefresh={this.allApps.bind(this)}
                />
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Application;
