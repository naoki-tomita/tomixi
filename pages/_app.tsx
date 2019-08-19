import React from "react";
import App from "next/app";
import { Header } from "../components/Header";
import { Container } from "../components/Container";

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <style global jsx>{`
          body {
            margin: 0;
            padding: 0;
          }
        `}</style>
        <Header />
        <Container>
          <Component {...pageProps} />
        </Container>
      </>
    );
  }
}
