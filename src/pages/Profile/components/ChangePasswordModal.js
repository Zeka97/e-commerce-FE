import React, { useState } from "react";
import { useMutation } from "react-query";
import { message, notification } from "antd";
import { useUser } from "../../../context/UserContext";

import { Modal, Form, Input } from "antd";
import { changeUserPassword, userCreateOrder } from "../../../api";

const ChangePasswordModal = ({ changePassword, setChangePassword, userId }) => {
  const { mutate } = useMutation((params) => changeUserPassword(params));
  const { logout } = useUser();

  const [changePasswordForm] = Form.useForm();

  const updatePassword = (values) => {
    mutate(
      { values, userId },
      {
        onSuccess: (data) => {
          notification.success({
            message: "Change password",
            description: "Succesfully changed password",
          });
          logout();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        onError: (err) => {
          notification.error({
            message: "Change password",
            description: "There was an error while changing the password",
          });
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
