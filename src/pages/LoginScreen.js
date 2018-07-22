import React from "react";
import {db} from "../firebase-init";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import "./LoginScreen.css";

import icon from "../icon.png";
const FormItem = Form.Item;

class LoginScreen extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const {email, password} = values;
        const {search} = this.props.location;
        
        const campaignId = search.substring(search.indexOf("=")+1);

       const campaignReference = await db.collection('campaigns').doc(campaignId);
        const campaign = await campaignReference.get();
        console.log(campaign.data());

      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="form-wrapper">
        <style>{"body { background-color: #ffeaa7; }"}</style>
        <div className="form-container">
          <div className="picture-container">
            <img src={icon} width={`auto`} height={`100%`}/>
          </div>
          <div>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator("email", {
                  rules: [
                    { required: true, message: "Please input your ID Number!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Enter Your Email"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your Password!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Enter Your Password"
                  />
                )}
              </FormItem>

              <FormItem>
                <Button
                  className="login-screen-button"
                  type="primary"
                  htmlType="submit"
                 
                >
                  Log in
                </Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(LoginScreen);

export default WrappedNormalLoginForm;
