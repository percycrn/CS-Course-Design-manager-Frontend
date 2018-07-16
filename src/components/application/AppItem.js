import React, { Component } from "react";
import { Modal, List, Button, Avatar } from "antd";
import axios from "axios";

class AppItem extends Component {
  state = {
    detailVisible: false,
    passVisible: false,
    denyVisible: false,
    applierVisible: false,
    itemData: [],
    applierInfo: []
  };

  setDetailVisible(detailVisible) {
    this.setState({
      detailVisible
    });
  }

  setPassVisible(passVisible) {
    this.setState({
      passVisible
    });
  }

  setDenyVisible(denyVisible) {
    this.setState({
      denyVisible
    });
  }

  setApplierVisible(applierVisible) {
    this.setState({
      applierVisible
    });
  }

  handlePass = e => {
    axios
      .patch(`/apps/${this.props.data.appId}`, { state: 1 })
      .then(({ data }) => {
        if (data.status === 200) {
          Modal.info({ content: data.message });
          this.setPassVisible(false);
        } else {
          Modal.info({ content: data.message });
          this.setPassVisible(false);
        }
        this.props.handleAppRefresh();
      });
  };

  handleDeny = e => {
    axios
      .patch(`/apps/${this.props.data.appId}`, { state: -1 })
      .then(({ data }) => {
        if (data.status === 200) {
          Modal.info({ content: data.message });
          this.setDenyVisible(false);
        } else {
          Modal.info({ content: data.message });
          this.setDenyVisible(false);
        }
        this.props.handleAppRefresh();
      });
  };

  handleDetail = e => {
    this.setDetailVisible(true);
    axios.get(`/found/${this.props.data.foundId}`).then(({ data }) => {
      this.setState({ itemData: data });
    });
  };

  showApplierInfo = e => {
    this.setApplierVisible(true);
    axios
      .get("/user", { params: { phone: this.props.data.phone } })
      .then(({ data }) => {
        this.setState({ applierInfo: data });
      });
  };

  render() {
    const itemData = this.state.itemData; // 申请的found的信息
    const applierInfo = this.state.applierInfo; // 申请人信息
    const data = this.props.data; // app信息
    return (
      <List.Item
        actions={[
          <div>
            <Button onClick={this.handleDetail}>item detail</Button>
            <Modal
              title="item"
              visible={this.state.detailVisible}
              onOk={() => this.setDetailVisible(false)}
              onCancel={() => this.setDetailVisible(false)}
              destroyOnClose
            >
              <div>
                <Avatar src={itemData.pic} />
                <p>name: {itemData.name}</p>
                <p>location: {itemData.location}</p>
                <p>time: {new Date(itemData.time).toLocaleDateString()}</p>
                <p>outline: {itemData.outline}</p>
              </div>
            </Modal>
          </div>,
          <div>
            <Button onClick={this.showApplierInfo}>applier info</Button>
            <Modal
              title="Confirm"
              visible={this.state.applierVisible}
              onOk={() => this.setApplierVisible(false)}
              onCancel={() => this.setApplierVisible(false)}
              maskClosable={false}
              destroyOnClose
            >
              <p>name: {applierInfo.name}</p>
              <p>phone: {applierInfo.phone}</p>
              <p>email: {applierInfo.email}</p>
              <p>address: {applierInfo.address}</p>
              <p>id: {applierInfo.id}</p>
              <p>credit: {applierInfo.credit}</p>
            </Modal>
          </div>,
          <div>
            <Button type="primary" onClick={() => this.setPassVisible(true)}>
              Pass
            </Button>
            <Modal
              title="Confirm"
              visible={this.state.passVisible}
              onOk={this.handlePass}
              onCancel={() => this.setPassVisible(false)}
              okText="confirm"
              maskClosable={false}
              destroyOnClose
            >
              <p>Are you sure to pass the application?</p>
            </Modal>
          </div>,
          <div>
            <Button type="danger" onClick={() => this.setDenyVisible(true)}>
              Deny
            </Button>
            <Modal
              title="Confirm"
              visible={this.state.denyVisible}
              onOk={this.handleDeny}
              onCancel={() => this.setDenyVisible(false)}
              okText="confirm"
              maskClosable={false}
              destroyOnClose
            >
              <p>Are you sure to deny the application?</p>
            </Modal>
          </div>
        ]}
      >
        <List.Item.Meta
          avatar={<Avatar src="http://pbt0hsxrl.bkt.clouddn.com/avater.jpeg" />}
          title={"appCode: " + data.appId}
          description={
            "apply time: " + new Date(data.time).toLocaleDateString()
          }
        />
      </List.Item>
    );
  }
}

export default AppItem;
