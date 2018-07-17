import React, { Component } from "react";
import { Modal, List, Button, Avatar } from "antd";
import axios from "axios";

class LostandfoundItem extends Component {
  state = {
    detailVisible: false,
    APVisible: false // apply or prompt visible
  };

  setDetailVisible(detailVisible) {
    this.setState({
      detailVisible
    });
  }

  setAPVisible(APVisible) {
    this.setState({
      APVisible
    });
  }

  handleAP = e => {
    const data = this.props.data;
    if (this.props.type === 1) {
      // apply
      axios
        .post("/apps", {
          time: new Date().getTime(),
          foundId: data.foundId,
          phone: this.props.phone
        })
        .then(({ data }) => {
          if (data.status === 200) {
            Modal.info({ content: data.message });
          } else {
            Modal.error({ content: data.message });
          }
        });
    } else {
      // prompt
      // TODO
      axios
        .post("/prompts", {
          lostId: data.lostId,
          lostPhone: data.lostPhone,
          foundPhone: this.props.phone
        })
        .then(({ data }) => {
          if (data.status === 200) {
            Modal.info({ content: data.message });
          } else {
            Modal.error({ content: data.message });
          }
        });
    }
    this.setAPVisible(false);
  };

  APModalInfo = e => {
    if (this.props.type === 1) {
      return "Are you sure to apply to fetch this item?";
    } else {
      return "Are you sure to prompt the man?";
    }
  };

  render() {
    const data = this.props.data;
    return (
      <List.Item
        actions={[
          <div>
            <Button onClick={() => this.setDetailVisible(true)}>detail</Button>
            <Modal
              title="item"
              visible={this.state.detailVisible}
              onOk={() => this.setDetailVisible(false)}
              onCancel={() => this.setDetailVisible(false)}
              destroyOnClose
            >
              <div>
                <img
                  alt=""
                  src={data.pic}
                  style={{
                    height: "100px",
                    marginBottom: "20px"
                  }}
                />
                <p>name: {data.name}</p>
                <p>location: {data.location}</p>
                <p>time: {new Date(data.time).toLocaleDateString()}</p>
                <p>outline: {data.outline}</p>
              </div>
            </Modal>
          </div>,
          <div>
            <Button type="primary" onClick={() => this.setAPVisible(true)}>
              {this.props.APName}
            </Button>
            <Modal
              title="Confirm"
              visible={this.state.APVisible}
              onOk={this.handleAP}
              onCancel={() => this.setAPVisible(false)}
              okText={this.props.APName}
              destroyOnClose
            >
              <p>{this.APModalInfo()}</p>
            </Modal>
          </div>
        ]}
      >
        <List.Item.Meta
          avatar={<Avatar src={data.pic} />}
          title={data.name}
          description={
            "outline: " +
            data.outline +
            "location: " +
            data.location +
            " time:" +
            new Date(data.time).toLocaleDateString()
          }
        />
      </List.Item>
    );
  }
}

export default LostandfoundItem;
