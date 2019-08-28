import React, { FC } from "react";
import "./Header.css";
import { Container } from "./Container";

export interface User {
  name: string;
  icon: string;
}

interface Props {
  user?: User;
}

export const Header: FC<Props> = ({ user }) => {
  return (
    <div className="header">
      <div className="background">
        <Container>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <a style={{ color: "#222" }} href="/">
              <h1 className="title">tomixi</h1>
            </a>
            {user && user.name}
          </div>
        </Container>
      </div>
    </div>
  );
};
