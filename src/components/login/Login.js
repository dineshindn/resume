import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input} from "antd";
import logo from "../../assets/gtalentpro-logo.png";
import "./login.css";
import { loginUser } from "../../utils/services/users";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (value) => {
    console.log(value, "dinesh")
    loginUser( value, 
      (success) => {
        sessionStorage.setItem('userId', success?.data?.user_id)
        sessionStorage.setItem('grantUser', success?.data?.grant_user)
        sessionStorage.setItem('userName', success?.data?.name)
        sessionStorage.setItem('role', success?.data?.role)
        sessionStorage.setItem('uuid', success?.data?.uid)
        navigate("/")
      },
      (err) => {
        console.log(err)
        // setLoading(false)
      }

      )
  };

  return (
    
    <div className="login-container">
    <div className="login-form">
      <div className="loginImg-container">
        <img src={logo} alt="logo" />
      </div>
      <h6 className="login-heading">Sign in your account</h6>

      <Form
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email:"
          name="email"
          rules={[
            {
              required: true,
              message: "Please Enter Your Email",
            },
              {
                type: 'email',
                // warningOnly: true,
              },
             
          ]}
        >
          <Input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Item>

        <Form.Item
          label="Password:"
          name="password"
          rules={[
            {
              required: true,
              message: "Please Enter Your Password",
            },
            {
              type: 'password',
              // warningOnly: true,
            },
         
          ]}
        >
          <Input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Item>
       {error && <p className="err-msg">{error}</p> }
        <Form.Item>
         <Button type="primary" htmlType="submit" className="login-btn">
          Login
        </Button>
        </Form.Item>
      </Form>

      <p style={{ color: "red", fontSize: "14px" }}>
        Forgot Password?
      </p>
      <p
        className="signup-text"
        style={{ marginTop: "12px", fontSize: "15px" }}
      >
        Don't you have an account?{" "}
        <a href="https://www.gtalentpro.com/register">Sign up now</a>
      </p>
    </div>
  </div>
  );
};

export default Login;
