import React, { Component } from "react";
import { Input, Breadcrumb, Button, List } from "antd";
import Item from "./LostandfoundItem";
import axios from "axios";

const Search = Input.Search;
class Lostandfound extends Component {
  state = {
    found: [],
    lost: [],
    data: [],
    type: 1,
    APName: "apply"
  };
  handleFoundData = e => {
    this.setState({ data: this.state.found, type: 1, APName: "apply" });
  };
  handleLostData = e => {
    this.setState({ data: this.state.lost, type: 0, APName: "prompt" });
  };

  componentWillMount() {
    axios.get(`/users/${this.props.userId}/found/other`).then(({ data }) => {
      this.setState({ found: data, data: data });
    });
    axios.get(`/users/${this.props.userId}/lost/other`).then(({ data }) => {
      this.setState({ lost: data });
    });
  }
  render() {
    return (
      <div>
        <Breadcrumb className="App-breadcrumb">
          <Breadcrumb.Item>HomePage</Breadcrumb.Item>
          <Breadcrumb.Item>
            <span style={{ fontWeight: "bold" }}>Lostandfound</span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="App-content">
          <div style={{ display: "flex", padding: "4px 16px 0px 16px" }}>
            <div className="App-title" id="title">
              List of Lostandfound Items
            </div>
            <div className="App-search">
              <Button.Group>
                <Button onClick={this.handleFoundData}>Founds</Button>
                <Button onClick={this.handleLostData}>Losts</Button>
              </Button.Group>
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
                <Item
                  data={item}
                  APName={this.state.APName}
                  phone={this.props.phone}
                  type={this.state.type}
                />
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Lostandfound;
