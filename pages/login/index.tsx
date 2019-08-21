import { NextPage } from "next";

import "../../components/Elements.css";
import "./index.css";
import { useState } from "react";

async function login(loginId: string, password: string) {
  return await fetch("/api/users/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ loginId, password })
  });
}

const Login: NextPage = () => {
  const [state, setState] = useState<{
    loginId: string;
    password: string;
    failedToLogin: boolean;
  }>({ loginId: "", password: "", failedToLogin: false });

  async function _login() {
    setState({ ...state, failedToLogin: false });
    const result = await login(state.loginId, state.password);
    if (result.ok) {
      location.href = "/";
    } else {
      setState({ ...state, failedToLogin: true });
    }
  }
  return (
    <div className="login">
      <div className="wrapper">
        <div className="container">
          {state.failedToLogin && (
            <div className="login-failed">Login failed.</div>
          )}
          <div className="field">
            <div className="label">id</div>
            <input
              className="input"
              onChange={({ target: { value: loginId } }) =>
                setState({ ...state, loginId })
              }
              style={{ width: 180 }}
            />
          </div>
          <div className="field">
            <div className="label">password</div>
            <input
              className="input"
              onChange={({ target: { value: password } }) =>
                setState({ ...state, password })
              }
              type="password"
              style={{ width: 180 }}
            />
          </div>
          <div className="center-field">
            <button className="button" onClick={_login}>
              login
            </button>
          </div>
          <div className="right-field">
            <a href="/register">account register</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
