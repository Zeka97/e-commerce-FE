import React, { useState } from "react";
import { Form, Input } from "antd";
import { useMutation } from "react-query";
import { login, loginUser } from "../../api";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomLinkButton from "../../components/customLinkButton/customLinkButton";
import { useForm } from "antd/lib/form/Form";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [logInForm] = Form.useForm();
  const { mutate } = useMutation((params) => loginUser(params));
  const { login } = useUser();

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
                login(data.user);
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/");
              } else {
                login(data.admin);
                localStorage.setItem("user", JSON.stringify(data.admin));
                navigate("/admin/dashboard");
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
    <div className="w-full h-screen flex">
      <div className="w-1/2 flex justify-center items-center text-5xl h-full m-auto bg-login bg-contain bg-center bg-no-repeat bg-blend-lighten" />
      <div className="flex items-center justify-center flex-col w-1/2">
        <h1 className="text-[64px]">Sign In</h1>

        <Form
          name="basic"
          layout="vertical"
          requiredMark={false}
          autoComplete="off"
          form={logInForm}
          className="flex flex-col w-[400px]"
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

          <CustomButton type="light" className="w-full mb-8" onClick={onSubmit}>
            Log in
          </CustomButton>
          <CustomLinkButton className="dark" to="/register">
            Sign up
          </CustomLinkButton>
        </Form>
      </div>
    </div>
  );
};

export default Login;
