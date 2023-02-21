import Favicon from "@/components/favicon";
import { NextScript } from "next/document";
import { Head, Html, Main } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <Favicon />
      </Head>
      <Main />
      <NextScript />
    </Html>
  );
}
