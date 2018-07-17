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
    search: [],
    type: 1,
    APName: "apply"
  };
  handleFoundData = e => {
    this.setState({ data: this.state.found, type: 1, APName: "apply" });
  };
  handleLostData = e => {
    this.setState({ data: this.state.lost, type: 0, APName: "prompt" });
  };

  handleSearchData(source) {
    if (source === "") {
      if (this.state.type === 1) {
        this.setState({ data: this.state.found });
      } else {
        this.setState({ data: this.state.lost });
      }
      return;
    }
    // 获得regs
    var i, l, j, m, pattern, k, n, reg;
    var regs = [];
    var accuracy = 1; // 越大越精确
    if (source.length > accuracy) {
      for (i = source.length, l = source.length - 1; i >= l; i--) {
        for (j = 0, m = source.length - i + 1; j < m; j++) {
          pattern = ".*";
          for (k = 1, n = i; k <= n; k++) {
            pattern = pattern + source.charAt(j + k - 1) + ".*";
          }
          console.log(pattern);
          reg = new RegExp(pattern);
          regs.push(reg);
        }
      }
    } else {
      for (i = source.length, l = 1; i >= l; i--) {
        for (j = 0, m = source.length - i + 1; j < m; j++) {
          pattern = ".*";
          for (k = 1, n = i; k <= n; k++) {
            pattern = pattern + source.charAt(j + k - 1) + ".*";
          }
          console.log(pattern);
          reg = new RegExp(pattern);
          regs.push(reg);
        }
      }
    }
    // 初始化
    this.setState({ search: [] });
    if (this.state.type === 1) {
      this.setState({ data: this.state.found });
    } else {
      this.setState({ data: this.state.lost });
    }
    var data = this.state.data;
    // 匹配
    for (i = 0, l = data.length; i < l; i++) {
      if (this.checkEquivalency(data[i], regs)) {
        this.state.search.push(data[i]);
      }
    }
    this.setState({ data: this.state.search });
  }

  checkEquivalency(target, regs) {
    for (var i = 0, l = regs.length; i < l; i++) {
      if (regs[i].test(target.name)) {
        return true;
      }
    }
    return false;
  }

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
                onSearch={value => this.handleSearchData(value)}
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
