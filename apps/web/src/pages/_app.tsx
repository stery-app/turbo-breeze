import type { AppProps } from "next/app";
import { Nunito } from "@next/font/google";
import "@/styles/global.css";

const nunito = Nunito({
  display: "swap",
  variable: "--font-sans",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${nunito.variable} font-sans antialiased`}>
      <Component {...pageProps} />
    </div>
  );
}
