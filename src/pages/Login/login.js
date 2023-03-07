import React, { useState } from "react";
import { Form, Input } from "antd";
import { adminLogin, userLogin } from "../../redux/actions/user.action";
import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import { useMutation } from "react-query";
import { login } from "../../api";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomLinkButton from "../../components/customLinkButton/customLinkButton";
import { useForm } from "antd/lib/form/Form";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const [logInForm] = Form.useForm();

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { mutate } = useMutation((params) => login(params));

  const onSubmit = (e) => {
    e.preventDefault();
    logInForm
      .validateFields()
      .then((values) => {
        mutate(
          { username: values.username, password: values.password },
          {
            onSuccess: (data) => {
              if (data.user) {
                dispatch(userLogin(data.user));
                localStorage.setItem(
                  "user",
                  JSON.stringify({
                    admin: null,
                    currentUser: data.user,
                    isLogged: true,
                  })
                );
              } else {
                dispatch(adminLogin(data.admin));
                localStorage.setItem(
                  "user",
                  JSON.stringify({
                    admin: data.admin,
                    currentUser: null,
                    isLogged: true,
                  })
                );
              }
            },
            onError: (error) => {
              console.log(error);
              setErrorMessage(error.response.data.message);
            },
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login_page">
      <div className="image"></div>
      <div className="sign-in">
        <h1>Sign In</h1>

        <Form
          name="basic"
          layout="vertical"
          requiredMark={false}
          autoComplete="off"
          form={logInForm}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Niste unijeli username!",
              },
            ]}
          >
            <Input type="text" name="username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Niste unijeli password!",
              },
            ]}
          >
            <Input.Password name="password" />
          </Form.Item>
          {errorMessage && (
            <p>
              <b>{errorMessage}</b>
            </p>
          )}

          <CustomButton
            className="light"
            style={{ marginBottom: "20px", marginTop: "20px" }}
            onClick={onSubmit}
          >
            Log in
          </CustomButton>
          <CustomLinkButton
            style={{ marginTop: "5px" }}
            className="dark"
            to="/register"
          >
            Sign up
          </CustomLinkButton>
        </Form>
      </div>
    </div>
  );
};

export default Login;
