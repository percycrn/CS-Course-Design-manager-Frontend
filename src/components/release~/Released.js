import React, { Component } from "react";
import { Input, Breadcrumb, Button, List } from "antd";
import ReleasedItem from "./ReleasedItem";
import axios from "axios";

const Search = Input.Search;
class Released extends Component {
  state = {
    found: [],
    lost: [],
    data: [],
    type: 1
  };
  handleFoundData = e => {
    this.setState({ data: this.state.found, type: 1 });
  };
  handleLostData = e => {
    this.setState({ data: this.state.lost, type: 0 });
  };

  allFounds() {
    axios.get(`/users/${this.props.userId}/found`).then(({ data }) => {
      this.setState({ found: data, data: data });
    });
  }

  allLosts() {
    axios.get(`/users/${this.props.userId}/lost`).then(({ data }) => {
      this.setState({ lost: data, data: data });
    });
  }

  componentWillMount() {
    axios.get(`/users/${this.props.userId}/found`).then(({ data }) => {
      this.setState({ found: data, data: data });
    });
    axios.get(`/users/${this.props.userId}/lost`).then(({ data }) => {
      this.setState({ lost: data });
    });
  }

  render() {
    return (
      <div>
        <Breadcrumb className="App-breadcrumb">
          <Breadcrumb.Item>HomePage</Breadcrumb.Item>
          <Breadcrumb.Item>
            <span style={{ fontWeight: "bold" }}>Released</span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="App-content">
          <div style={{ display: "flex", padding: "4px 16px 0px 16px" }}>
            <div className="App-title" id="title">
              List of Released Items
            </div>
            <div className="App-search">
              <Button.Group>
                <Button onClick={this.handleFoundData}>Founds</Button>
                <Button onClick={this.handleLostData}>Losts</Button>
              </Button.Group>
              <Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
                style={{
                  width: "300px",
                  marginLeft: "16px",
                  height: "30px"
                }}
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
                <ReleasedItem
                  data={item}
                  handleFoundsRefresh={this.allFounds.bind(this)}
                  handleLostsRefresh={this.allLosts.bind(this)}
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

export default Released;
