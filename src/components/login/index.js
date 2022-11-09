import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  notification,
  Row,
} from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

function Login() {
  const navigate = useNavigate();
  const openNotificationWithIcon = (type) => {
    if (type === "success") {
      notification[type]({
        message: "Login Success",
      });
    } else {
      notification[type]({
        message: "Login Fail",
      });
    }
  };
  const onFinish = (values) => {
    axios
      .post("https://smanagement1.herokuapp.com/api/login", {
        username: values?.username,
        password: values?.password,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data.access_token);
          localStorage.setItem("isLoggedIn", true);
          navigate("/crud");
          openNotificationWithIcon("success");
        }
      })
      .catch((error) => {
        console.log(error);
        openNotificationWithIcon("error");
      });
  };

  return (
    <Row justify="center">
      <Col>
        <Card style={{ marginTop: 45 }}>
          <Col span={24} className="typo-grey typo-center">
            <h2>Login Form</h2>
          </Col>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or <Link to={"/register"}>register now!</Link>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default Login;
