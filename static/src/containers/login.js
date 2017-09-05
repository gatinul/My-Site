import React from "react";
import WrappedLoginForm from "../components/LoginForm.js";
import api from "../../api/index.js";


class Login extends React.Component {
  render() {
    return (
      <div style={{ marginLeft: "", marginTop: "150px" }}>
        <WrappedLoginForm/>
      </div>
    );
  }
}

export default Login;
