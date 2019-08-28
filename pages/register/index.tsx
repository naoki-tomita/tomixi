import { NextPage } from "next";
import { useState } from "react";

import "../../components/Elements.css";
import "../login/index.css";

function register(loginId: string, password: string) {
  return fetch("/api/users/register", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ loginId, password })
  });
}

const Login: NextPage = () => {
  const [state, setState] = useState<{
    loginId: string;
    password1: string;
    password2: string;
  }>({ loginId: "", password1: "", password2: "" });
  const { loginId, password1, password2 } = state;

  async function _register() {
    const result = await register(loginId, password1);
    if (result.ok) {
      location.href = "/";
    }
  }

  return (
    <div className="login">
      <div className="wrapper">
        <div className="container">
          <div className="field">
            <div className="label">id</div>
            <input
              className="input"
              value={loginId}
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
              value={password1}
              onChange={({ target: { value: password1 } }) =>
                setState({ ...state, password1 })
              }
              type="password"
              style={{ width: 180 }}
            />
          </div>
          <div className="field">
            <div className="label">re password</div>
            <input
              className="input"
              value={password2}
              onChange={({ target: { value: password2 } }) =>
                setState({ ...state, password2 })
              }
              type="password"
              style={{ width: 180 }}
            />
          </div>
          <div className="center-field">
            <button className="button" onClick={_register}>
              register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
