import { NextPage } from "next";

import "../../components/Elements.css";
import "./index.css";

const Login: NextPage = () => {
  return (
    <div className="login">
      <div className="wrapper">
        <div className="container">
          <div className="field">
            <div className="label">id</div>
            <input className="input" style={{ width: 180 }} />
          </div>
          <div className="field">
            <div className="label">password</div>
            <input className="input" type="password" style={{ width: 180 }} />
          </div>
          <div className="center-field">
            <button className="button">login</button>
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
