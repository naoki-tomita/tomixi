import React, { FC } from "react";
import "./Header.css";
import { Container } from "./Container";

export const Header: FC = () => {
  return (
    <div className="header">
      <div className="background">
        <Container>
          <a style={{ color: "#222" }} href="/">
            <h1 className="title">tomixi</h1>
          </a>
        </Container>
      </div>
    </div>
  );
};
