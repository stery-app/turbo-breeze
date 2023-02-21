import { GuestLayoutProps } from "@/types";
import Head from "next/head";

const GuestLayout = ({ children }: GuestLayoutProps) => {
  return (
    <div className="dark:bg-gray-900">
      <Head>
        <title>Stery</title>
      </Head>

      <div className="font-sans text-gray-900 antialiased">{children}</div>
    </div>
  );
};

export default GuestLayout;
