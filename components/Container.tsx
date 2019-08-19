import React, { FC } from "react";

export const Container: FC = ({ children }) => {
  return (
    <>
      <style jsx>{`
        .wrapper {
          position: relative;
        }
        .container {
          position: relative;
          margin: auto;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          width: 960px;
        }
        @media screen and (max-width: 1024px) {
          .container {
            width: 960px;
          }
        }
        @media screen and (max-width: 896px) {
          .container {
            width: 640px;
          }
        }
        @media screen and (max-width: 480px) {
          .container {
            width: 420px;
          }
        }
      `}</style>
      <div className="wrapper">
        <div className="container">{children}</div>
      </div>
    </>
  );
};
