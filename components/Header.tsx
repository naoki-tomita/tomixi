import React, { FC } from "react";
import { Container } from "./Container";

const Title: FC = ({ children }) => {
  return (
    <h1
      style={{
        borderRadius: 4,
        border: "none",
        margin: 0,
        padding: "0px 8px",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        display: "inline-block"
      }}
    >
      {children}
    </h1>
  );
};

export const Header: FC = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: "#E89F3F",
          padding: "8px 20px"
        }}
      >
        <Container>
          <Title>tomixi</Title>
        </Container>
      </div>
    </>
  );
};
