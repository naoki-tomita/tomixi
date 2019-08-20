import { NextPage } from "next";

import "../../components/Elements.css";
import "../login/index.css";

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
          <div className="field">
            <div className="label">re password</div>
            <input className="input" type="password" style={{ width: 180 }} />
          </div>
          <div className="center-field">
            <button className="button">register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
