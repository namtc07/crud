import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import App from "../App";
const { Header, Sider, Content } = Layout;

function LayoutPage() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.setItem("isLoggedIn", false);
    navigate("/login");
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ height: "100vh" }}
          items={[
            {
              key: "1",
              label: <Link to={"/crud"}>CRUD</Link>,
            },
            {
              key: "2",
              label: <Link to={"/crud-user"}>CRUDUSer</Link>,
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <App />
        </Content>
      </Layout>
    </Layout>
  );
}

export default LayoutPage;
