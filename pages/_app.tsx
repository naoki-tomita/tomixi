import React from "react";
import App, { AppContext } from "next/app";
import Router from "next/router";
import { NextPageContext } from "next";
import fetch from "node-fetch";

import { Header, User } from "../components/Header";
import { Container } from "../components/Container";

import "./_app.css";

async function identify(origin: string, cookies: string) {
  const result = await fetch(`${origin}/api/users/identify`, {
    headers: { cookie: cookies }
  });
  if (result.ok) {
    return await result.json();
  }
  return null;
}

function origin(context?: NextPageContext) {
  return context ?
    "http://localhost:3000" : location.origin;
}

export default class MyApp extends App<{ user?: User }> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    const {req, res} = ctx;
    const { cookie } = req.headers;
    const foundUser = await identify(origin(ctx), cookie);
    console.log(foundUser);

    if (
      !foundUser &&
      !(req.url.includes("login") || req.url.includes("register"))
    ) {
      process.browser
        ? Router.push("/login")
        : (res.writeHead(302, { Location: "/login" }), res.end());
      return;
    }

    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    const user: User | undefined = foundUser && { name: foundUser.loginId, icon: "" }

    return { pageProps, user };
  }

  render() {
    const { Component, pageProps, user } = this.props;

    return (
      <>
        <Header user={user} />
        <div className="content">
          <Container>
            <Component {...pageProps} />
          </Container>
        </div>
      </>
    );
  }
}
