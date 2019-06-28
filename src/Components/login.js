import React from "react";
// import './Login.css'
// import { directive } from '@babel/types';

const Login = props => {
  return (
    <div className="login">
      <input
        type="text"
        placeholder="ID please..."
        onChange={props.changeHandler}
      />
      <i type="submit" onClick={props.loggin}>
        Login
      </i>
    </div>
  );
};

export default Login;
