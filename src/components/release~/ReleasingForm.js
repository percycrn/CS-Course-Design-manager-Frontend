import React, { Component } from "react";
import {
  Form,
  Input,
  DatePicker,
  Tooltip,
  Icon,
  Button,
  Radio,
  Modal
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class ReleasingForm extends Component {
  state = {
    disabled: false,
    value: 1,
    phone: "foundPhone"
  };

  handleBeforeSubmit = e => {
    const form = this.props.form;
    form.setFieldsValue({
      time: new Date(form.getFieldValue("DatePicker")).getTime()
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = this.props.form;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
      if (this.state.value === 1) {
        // found
        axios.post("/found", values).then(({ data }) => {
          console.log(data);
          if (data.status === 200) {
            Modal.info({ content: data.message });
            form.setFieldsValue({
              time: "",
              name: "",
              location: "",
              storage: "",
              outline: ""
            });
          } else {
            Modal.error({ content: data.message });
          }
        });
      } else {
        // lost
        axios.post("/lost", values).then(({ data }) => {
          console.log(data);
          if (data.status === 200) {
            Modal.info({ content: data.message });
            form.setFieldsValue({
              time: "",
              name: "",
              location: "",
              storage: "",
              outline: ""
            });
          } else {
            Modal.error({ content: data.message });
          }
        });
      }
    });
  };

  handleFormChange = e => {
    if (e.target.value === 1) {
      this.setState({
        disabled: false,
        value: e.target.value,
        phone: "foundPhone"
      });
    } else {
      this.setState({
        disabled: true,
        value: e.target.value,
        phone: "lostPhone"
      });
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const config = {
      rules: [
        { type: "object", required: true, message: "Please select time!" }
      ]
    };

    return (
      <Form onSubmit={this.handleSubmit} className="App-form">
        <FormItem {...formItemLayout} label="type">
          {getFieldDecorator("type", { initialValue: this.state.value })(
            <RadioGroup onChange={this.handleFormChange}>
              <Radio value={1}>found</Radio>
              <Radio value={2}>lost</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={
            <span>
              Name&nbsp;
              <Tooltip title="the name of the item you found">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "Please input the name!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Location">
          {getFieldDecorator("location", {
            rules: [
              {
                required: true,
                message: "Please input the location!"
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Time">
          {getFieldDecorator("DatePicker", config)(
            <DatePicker
              style={{ width: "100%" }}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={
            <span>
              Storage&nbsp;
              <Tooltip title="the location you preserve the found item">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("storage", {})(
            <Input disabled={this.state.disabled} />
          )}
        </FormItem>
        {/* <FormItem {...formItemLayout} label="Upload">
          {getFieldDecorator("upload", {
            valuePropName: "fileList",
            getValueFromEvent: this.normFile
          })(
            <Upload {...props}>
              <Button>
                <Icon type="upload" /> Upload picture
              </Button>
            </Upload>
          )}
        </FormItem> */}
        <FormItem
          {...formItemLayout}
          label={
            <span>
              Outline&nbsp;
              <Tooltip title="the more specific, the better">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("outline", {
            rules: [
              {
                required: true,
                message: "Please input the outline!",
                whitespace: true
              }
            ]
          })(<TextArea rows={2} />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={this.handleBeforeSubmit}
          >
            Release
          </Button>
        </FormItem>
        <FormItem>
          {getFieldDecorator(this.state.phone, {
            initialValue: this.props.phone
          })(<Input type="hidden" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("time", {})(<Input type="hidden" />)}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(ReleasingForm);
