import React from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { Form, Input, notification } from "antd";
import { registerUser } from "../../api";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomLinkButton from "../../components/customLinkButton/customLinkButton";

const Signup = () => {
  const navigate = useNavigate();

  const [signupForm] = Form.useForm();

  const { mutate } = useMutation((params) => registerUser(params));

  const registerProfile = (e) => {
    e.preventDefault();

    signupForm
      .validateFields()
      .then((values) => {
        mutate(values, {
          onSuccess: () => {
            notification.success({
              message: "Signup",
              description: "You have succesfully created a new account",
            });
            navigate("/login");
          },
          onError: (error) => {
            notification.error({
              message: "Signup",
              description: "Error while  making an  account",
            });
            console.log(error);
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="signup_page">
      <div className="image"></div>
      <div className="content_box">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          layout="vertical"
          autoComplete="off"
          requiredMark={false}
          form={signupForm}
        >
          <Form.Item
            label="Ime"
            name="ime"
            rules={[
              { required: true, message: "Polje ime ne smije biti prazno!" },
            ]}
          >
            <Input type="text" name="ime" />
          </Form.Item>
          <Form.Item
            label="Prezime"
            name="prezime"
            rules={[
              {
                required: true,
                message: "Polje prezime ne smije biti prazno!",
              },
            ]}
          >
            <Input type="text" name="prezime" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "Niste unijeli validan E-mail!",
              },
              {
                required: true,
                message: "Polje email ne smije biti prazno!",
              },
            ]}
          >
            <Input name="email" />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Polje username ne smije biti prazno!",
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
                message: "Polje password ne smije biti prazno!",
              },
            ]}
          >
            <Input.Password name="password" />
          </Form.Item>
          <Form.Item
            label="Grad"
            name="grad"
            rules={[
              { required: true, message: "Polje grad ne smije biti prazno!" },
            ]}
          >
            <Input type="text" name="grad" />
          </Form.Item>
          <Form.Item
            label="Adresa"
            name="adresa"
            rules={[
              { required: true, message: "Polje adresa ne smije biti prazno!" },
            ]}
          >
            <Input type="text" name="adresa" />
          </Form.Item>
          <Form.Item
            label="Broj telefona"
            name="telefon"
            rules={[
              {
                required: true,
                message: "Polje telefon ne smije biti prazno!",
              },
            ]}
          >
            <Input type="text" name="telefon" />
          </Form.Item>
          <CustomButton
            className="black"
            onClick={registerProfile}
            style={{ marginBottom: "10px" }}
          >
            Registruj se
          </CustomButton>
          <CustomLinkButton className="light" to="/login">
            Log in
          </CustomLinkButton>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
