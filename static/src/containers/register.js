import React from "react";
import WrappedRegistrationForm from "../components/RegisterForm.js";

class Register extends React.Component {
  render() {
    return (
      <div style={{  marginTop: "150px" }}>
        <WrappedRegistrationForm />
      </div>
    );
  }
}

export default Register;