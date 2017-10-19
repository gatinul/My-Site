import { Form, Icon, Input, Button, Checkbox ,Modal} from "antd";
import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
const FormItem = Form.Item;
import "../css/login.css";
import {Link} from 'react-router'
import api from "../../api/index.js";
import { browserHistory } from 'react-router';

class LoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        api.userLogin(values).then(res=> {
          console.log(res);
          if(res.success){
            browserHistory.push('/home')
          }else{
            Modal.error({
              title: '登录失败',
              content: res.message
            });
          }
        });
      }
    });
  };
  render() {
    console.log(this.props)
    const { getFieldDecorator } = this.props.form;

    return (
      <div style={{ marginLeft: "40%", marginTop: "150px" }}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator("userName", {
              rules: [{ required: true, message: "请输入姓名" }]
            })(
              <Input
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                placeholder="Username"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "请输入密码" }]
            })(
              <Input
                prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>记住密码</Checkbox>)}
            <a className="login-form-forgot" href="">
              忘记密码
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
            或者 <Link to="/register">现在注册</Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm;
// export default connect(login)(WrappedLoginForm);
