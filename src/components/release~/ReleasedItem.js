import React, { Component } from "react";
import { Modal, List, Button, Avatar } from "antd";
import axios from "axios";
import EditForm from "./EditForm";

class ReleasedItem extends Component {
  state = {
    editVisible: false,
    deleteVisible: false
  };

  setEditVisible(editVisible) {
    this.setState({
      editVisible
    });
  }

  setDeleteVisible(deleteVisible) {
    this.setState({
      deleteVisible
    });
  }

  findOrNot = e => {
    if (this.props.type === 1) {
      if (this.props.data.lostPhone !== null) {
        return "已找到失主";
      } else {
        return "未找到失主";
      }
    } else {
      if (this.props.data.found === 1) {
        return "已找到";
      } else {
        return "未找到";
      }
    }
  };

  handleDelete = e => {
    const type = this.props.type;
    if (type === 1) {
      axios.delete(`/found/${this.props.data.foundId}`).then(({ data }) => {
        if (data.status === 200) {
          // 放axios里面
          this.props.handleFoundsRefresh();
          this.setDeleteVisible(false);
        } else {
          Modal.error({ content: data.message });
          this.setDeleteVisible(false);
        }
      });
    } else {
      axios.delete(`/lost/${this.props.data.lostId}`).then(({ data }) => {
        if (data.status === 200) {
          this.props.handleLostsRefresh();
          this.setDeleteVisible(false);
        } else {
          Modal.error({ content: data.message });
          this.setDeleteVisible(false);
        }
      });
    }
  };

  render() {
    const data = this.props.data;
    return (
      <List.Item
        actions={[
          <div>
            <Button onClick={() => this.setEditVisible(true)}>edit</Button>
            <Modal
              title="Update item"
              visible={this.state.editVisible}
              footer={null}
              closable={false}
              destroyOnClose
            >
              <EditForm
                type={this.props.type}
                lostId={data.lostId}
                foundId={data.foundId}
                lostPhone={data.lostPhone}
                foundPhone={data.foundPhone}
                setEditVisible={this.setEditVisible.bind(this)}
                data={data}
                handleFoundsRefresh={this.props.handleFoundsRefresh.bind(this)}
                handleLostsRefresh={this.props.handleLostsRefresh.bind(this)}
              />
            </Modal>
          </div>,
          <div>
            <Button type="danger" onClick={() => this.setDeleteVisible(true)}>
              delete
            </Button>
            <Modal
              title="Warning!"
              visible={this.state.deleteVisible}
              onOk={this.handleDelete}
              okText="delete"
              onCancel={() => this.setDeleteVisible(false)}
              maskClosable={false}
              destroyOnClose
            >
              <div>Are you sure to delete this item?</div>
            </Modal>
          </div>
        ]}
      >
        <List.Item.Meta
          avatar={<Avatar src={data.pic} />}
          title={data.name}
          description={
            "time: " +
            new Date(data.time).toLocaleDateString() +
            " | location: " +
            data.location +
            " | outline: " +
            data.outline +
            " | " +
            this.findOrNot()
          }
        />
      </List.Item>
    );
  }
}

export default ReleasedItem;
