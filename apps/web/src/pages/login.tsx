import ApplicationLogo from "@/components/application-logo";
import AuthCard from "@/components/auth-card";
import AuthSessionStatus from "@/components/auth-session-status";
import Button from "@/components/button";
import GuestLayout from "@/components/layouts/guest-layout";
import Input from "@/components/input";
import InputError from "@/components/input-error";
import Label from "@/components/label";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [shouldRemember, setShouldRemember] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>([]);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        typeof router.query?.reset?.length !== "undefined" &&
        router.query?.reset?.length > 0 &&
        errors.length === 0
      ) {
        setStatus(window.atob(router.query.reset as string));
      } else {
        setStatus(null);
      }
    }
  });

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    login({
      email,
      password,
      remember: shouldRemember,
      setErrors,
      setStatus,
    });
  };

  return (
    <GuestLayout>
      <AuthCard
        logo={
          <Link href="/">
            <ApplicationLogo type="inline" className="h-16 object-contain text-gray-500" />
          </Link>
        }
      >
        {/* Session Status */}
        <AuthSessionStatus className="mb-4" status={status} />

        <form onSubmit={submitForm}>
          {/* Email Address */}
          <div>
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              value={email}
              className="block mt-1 w-full"
              onChange={(event) => setEmail(event.target.value)}
              required
              autoFocus
            />

            <InputError messages={errors.email} className="mt-2" />
          </div>

          {/* Password */}
          <div className="mt-4">
            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              type="password"
              value={password}
              className="block mt-1 w-full"
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
            />

            <InputError messages={errors.password} className="mt-2" />
          </div>

          {/* Remember Me */}
          <div className="block mt-4">
            <label htmlFor="remember_me" className="inline-flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                name="remember"
                className="rounded border-gray-300 text-pink-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(event) => setShouldRemember(event.target.checked)}
              />

              <span className="ml-2 text-sm text-gray-600 dark:text-gray-200 dark:hover:text-gray-400">Remember me</span>
            </label>
          </div>

          <div className="flex items-center justify-end mt-4">
            <Link
              href="/forgot-password"
              className="underline text-sm text-gray-600 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-400"
            >
              Forgot your password?
            </Link>

            <Button className="ml-3">Login</Button>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  );
};

export default Login;
