import React, { useState } from "react";
import { useMutation } from "react-query";
import { message } from "antd";

import { Modal, Form, Input } from "antd";
import { changeUserPassword, userCreateOrder } from "../../../api";

const ChangePasswordModal = ({ changePassword, setChangePassword, userId }) => {
  const { mutate } = useMutation((params) => changeUserPassword(params));

  const [changePasswordForm] = Form.useForm();

  const updatePassword = (values) => {
    mutate(
      { values, userId },
      {
        onSuccess: (data) => {
          message.success("Uspjesno ste promjenili lozinku", 5);
          localStorage.removeItem("user");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        onError: (err) => {
          message.error("Greska pri izmjeni lozinke");
        },
      }
    );
  };

  const changePasswordHandleOK = () => {
    changePasswordForm
      .validateFields()
      .then((values) => {
        if (values.newPassword !== values.confirmNewPassword)
          throw "Lozinke se razlikuju";
        updatePassword(values);
      })
      .catch((err) =>
        message.error("Nova sifra i potvrda nove sifre nisu jednake!", 2)
      );
  };

  return (
    <Modal
      title="Change profile"
      centered
      open={changePassword}
      onOk={changePasswordHandleOK}
      onCancel={() => setChangePassword(false)}
      width={700}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
        form={changePasswordForm}
      >
        <Form.Item
          label="Current password"
          name="currentPassword"
          rules={[{ required: true, message: "Polje ne smije biti prazno!" }]}
        >
          <Input.Password name="currentPassword" />
        </Form.Item>
        <Form.Item
          label="New password"
          name="newPassword"
          rules={[
            {
              required: true,
              message: "Polje ne smije biti prazno!",
            },
          ]}
        >
          <Input.Password name="newPassword" />
        </Form.Item>
        <Form.Item
          label="Confirm new password"
          name="confirmNewPassword"
          rules={[
            {
              required: true,
              message: "Polje ne smije biti prazno!",
            },
          ]}
        >
          <Input.Password name="confirmNewPassword" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
