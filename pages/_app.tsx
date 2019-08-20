import React from "react";
import App, { AppContext } from "next/app";
import Router from "next/router";

import { Header } from "../components/Header";
import { Container } from "../components/Container";
import { parse } from "../domain/Cookie";

import "./_app.css";

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {};
    const { req } = ctx;
    const session = (
      parse(req.headers.cookie).find(it => it.name === "session") || {
        value: undefined
      }
    ).value;

    if (
      !session &&
      !(req.url.includes("login") || req.url.includes("register"))
    ) {
      const { res } = ctx;
      process.browser
        ? Router.push("/login")
        : (res.writeHead(302, { Location: "/login" }), res.end());
      return;
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Header />
        <div className="content">
          <Container>
            <Component {...pageProps} />
          </Container>
        </div>
      </>
    );
  }
}
