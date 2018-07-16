import React, { Component } from "react";
import { withRouter, Route, Switch, NavLink } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import Header from "./Header";
import logo from "./logo.svg";

import BeforeLostandfound from "./lostandfound/BeforeLostandfound";
import BeforeReleased from "./release~/BeforeReleased";
import Releasing from "./release~/Releasing";
import BeforeApplication from "./application/BeforeApplication";

const { Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class MainPage extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <img src={logo} className="App-logo" alt="logo" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["/lostandfound/found"]}
            mode="inline"
          >
            <Menu.Item key="/lostandfound">
              <NavLink to="/lostandfound">
                <Icon type="solution" />
                <span>lostandfound</span>
              </NavLink>
            </Menu.Item>

            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="form" />
                  <span>Release</span>
                </span>
              }
            >
              <Menu.Item key="/release/releasing">
                <NavLink to="/release/releasing">release now!</NavLink>
              </Menu.Item>
              <Menu.Item key="/release/released">
                <NavLink to="/release/released">released</NavLink>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="/application">
              <NavLink to="/application">
                <Icon type="profile" />
                <span>Application</span>
              </NavLink>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout>
          <Header handleSignOut={this.props.handleSignOut} />
          <Switch>
            <Route
              path="/lostandfound"
              component={BeforeLostandfound}
              BeforeLostandfound
            />
            <Route
              path="/release/released"
              component={BeforeReleased}
              BeforeReleased
            />
            <Route path="/release/releasing" component={Releasing} Releasing />
            <Route
              path="/application"
              component={BeforeApplication}
              BeforeApplication
            />
          </Switch>
          <Footer className="App-root">
            lostandfound @2018 Created by Eric Chen
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(MainPage);
