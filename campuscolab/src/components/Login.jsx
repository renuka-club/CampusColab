import React from "react";
import { useLocation } from "react-router-dom";
import Admin from "./Admin";
import "./log.css";
import Student from "./Student";
import Teacher from "./Teacher";

const Login = () => {
  const location = useLocation();
  const role = location.state?.role || null;

  let welcomeMessage = "Welcome";
  if (role === "Admin") welcomeMessage = "Welcome to Admin Dashboard";
  else if (role === "Teacher") welcomeMessage = "Welcome to Teacher Dashboard";
  else if (role === "Student") welcomeMessage = "Welcome to Student Dashboard";
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{welcomeMessage}</h2>
        {role === "Admin" && <Admin />}
        {role === "Teacher" && <Teacher />}
        {role === "Student" && <Student />}
        {!role && <p>Please select a role to continue.</p>}
      </div>
    </div>
  );
};

export default Login;
