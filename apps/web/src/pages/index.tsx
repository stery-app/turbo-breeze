import Head from "next/head";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import ApplicationLogo from "@/components/application-logo";

export default function Home() {
  const { user } = useAuth({ middleware: "guest" });

  return (
    <>
      <Head>
        <title>Stery</title>
      </Head>

      <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white sm:items-center sm:pt-0">
        <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
          {user ? (
            <Link
              href="/dashboard"
              className="ml-4 text-sm text-gray-700 dark:text-white underline"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-gray-700 dark:text-white underline"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="ml-4 text-sm text-gray-700 dark:text-white underline"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-center flex-col items-center pt-8 sm:justify-start sm:pt-0">
            <ApplicationLogo
              type="inline"
              className="h-20 w-max object-contain"
            />
            <p className="font-semibold text-lg">Turbo Breeze</p>
            <p className="text-sm mt-2 dark:text-white/60">
              Turbo Repo Template for Laravel Breeze
            </p>
          </div>

          <div className="mt-8 bg-white dark:bg-gray-800 dark:text-white overflow-hidden shadow sm:rounded-lg p-4 flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="w-6 h-6"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <Link
              href="@"
              className="font-bold hover:underline inline-flex items-center mt-2"
            >
              Github
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
