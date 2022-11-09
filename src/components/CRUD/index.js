import { Button, Form, Input, Modal, notification, Table } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

function CRUD() {
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(false);
  const [id, setId] = useState();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  const showUserModal = (record) => {
    setOpen(true);
    setId(record.id);

    form.setFieldsValue({
      id: record.id,
      firstname: record.firstname,
      lastname: record.lastname,
      phone_number: record.phone_number,
      email: record.email,
      gender: record.gender,
      address: record.address,
      identification: record.identification,
    });
  };
  const hideUserModal = () => {
    setOpen(false);
  };
  const useResetFormOnCloseModal = ({ form, open }) => {
    const prevOpenRef = useRef();
    useEffect(() => {
      prevOpenRef.current = open;
    }, [open]);
    const prevOpen = prevOpenRef.current;
    useEffect(() => {
      if (!open && prevOpen) {
        form.resetFields();
      }
    }, [form, prevOpen, open]);
  };
  const ModalForm = ({ open, onCancel }) => {
    useResetFormOnCloseModal({
      form,
      open,
    });
    const onOk = () => {
      form.submit();
      const valuesForm = form.getFieldsValue(true);
      console.log(valuesForm);
      axios
        .put(
          `https://smanagement1.herokuapp.com/api/student/${id}`,
          valuesForm,
          {
            params: { token: localStorage.getItem("token") },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            navigate("/crud");
            hideUserModal();
            return openNotificationWithIcon("success", res.data.message);
          } else {
            return openNotificationWithIcon("error", res.data.message);
          }
        });
    };
    return (
      <Modal title="Update Student" open={open} onOk={onOk} onCancel={onCancel}>
        <Form form={form} layout="vertical" name="userForm">
          <Form.Item
            name="firstname"
            label="First Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastname"
            label="Last Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone_number"
            label="Phone Number"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="identification"
            label="ID Card"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      description: message,
    });
  };

  const access_token = localStorage.getItem("token");

  useEffect(() => {
    if (!access_token) navigate("/login");
    setloading(true);
    axios
      .get(`https://smanagement1.herokuapp.com/api/students?page=${page}`, {
        params: { token: access_token },
      })
      .then((res) => {
        console.log("res", res);
        setData(res?.data?.data);
        setloading(false);
      });
  }, [page]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.setItem("isLoggedIn", false);
    navigate("/login");
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://smanagement1.herokuapp.com/api/student/${id}`, {
        params: { token: access_token },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          navigate("/crud");
          return openNotificationWithIcon("success", res.data.message);
        } else {
          return openNotificationWithIcon("error", res.data.message);
        }
      });
  };

  const handleEdit = (record) => {
    showUserModal(record);

    // axios
    //   .put(`https://smanagement1.herokuapp.com/api/student/${id}`)
    //   .then((res) => console.log(res));
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      render: (_, record, index) => index + 1,
    },
    {
      title: "Full Name",
      render: (record) => `${record?.firstname} ${record?.lastname}`,
    },
    {
      title: "School",
      dataIndex: "school",
      render: (record) => record.name,
    },
    {
      title: "Phone No",
      dataIndex: "phone_number",
    },
    {
      title: "ID Card",
      dataIndex: "identification",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Actions",
      render: (record) => {
        return (
          <div className="group-btn">
            <Button className="btn" onClick={() => handleEdit(record)}>
              Edit
            </Button>
            <Button className="btn" onClick={() => handleDelete(record.id)}>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="wrapper">
      <div className="header">
        <div className="title">CRUD APP</div>
        <div className="group-btn">
          <Button className="btn">New Student</Button>
          <Button className="btn" onClick={() => handleLogout()}>
            Log out
          </Button>
        </div>
      </div>
      <div className="table">
        <Table
          loading={loading}
          columns={columns}
          dataSource={data?.data}
          rowKey={(record) => record.id}
          pagination={{
            total: data?.total,
            pageSize: page.litmit,
            onChange: (page) => setpage(page),
            current: data?.current_page,
            showSizeChanger: false,
          }}
        />
        <ModalForm open={open} onCancel={hideUserModal} />
      </div>
    </div>
  );
}

export default CRUD;
