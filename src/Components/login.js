import React from "react";
import "./Login.css";

const Login = props => {
  let className = props.loginFail;
  if (className) {
    return (
      <div className="login">
        <form onSubmit={props.loggin}>
          <input
            type="text"
            placeholder="Case sensitive ID please..."
            onChange={props.changeHandler}
          />
          <i type="submit" className="true" onClick={props.loggin}>
            Login
          </i>
        </form>
      </div>
    );
  } else {
    return (
      <div className="login">
        <input
          type="text"
          placeholder="Case sensitive ID please...."
          onChange={props.changeHandler}
        />
        <i type="submit" className="false" onClick={props.loggin}>
          Login
        </i>
      </div>
    );
  }
};

export default Login;
