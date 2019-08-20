import React, { FC } from "react";
import "./Container.css";

export const Container: FC = ({ children }) => {
  return (
    <>
      <div className="wrapper">
        <div className="container">{children}</div>
      </div>
    </>
  );
};
