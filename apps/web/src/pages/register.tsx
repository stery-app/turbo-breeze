import ApplicationLogo from "@/components/application-logo";
import AuthCard from "@/components/auth-card";
import Button from "@/components/button";
import GuestLayout from "@/components/layouts/guest-layout";
import Input from "@/components/input";
import InputError from "@/components/input-error";
import Label from "@/components/label";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import { useState } from "react";

const Register = () => {
  const { register } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [errors, setErrors] = useState<any>([]);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    register({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      setErrors,
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
        <form onSubmit={submitForm}>
          {/* Name */}
          <div>
            <Label htmlFor="name">Name</Label>

            <Input
              id="name"
              type="text"
              value={name}
              className="block mt-1 w-full"
              onChange={(event) => setName(event.target.value)}
              required
              autoFocus
            />

            <InputError messages={errors.name} className="mt-2" />
          </div>

          {/* Email Address */}
          <div className="mt-4">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              value={email}
              className="block mt-1 w-full"
              onChange={(event) => setEmail(event.target.value)}
              required
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
              autoComplete="new-password"
            />

            <InputError messages={errors.password} className="mt-2" />
          </div>

          {/* Confirm Password */}
          <div className="mt-4">
            <Label htmlFor="passwordConfirmation">Confirm Password</Label>

            <Input
              id="passwordConfirmation"
              type="password"
              value={passwordConfirmation}
              className="block mt-1 w-full"
              onChange={(event) => setPasswordConfirmation(event.target.value)}
              required
            />

            <InputError
              messages={errors.password_confirmation}
              className="mt-2"
            />
          </div>

          <div className="flex items-center justify-end mt-4">
            <Link
              href="/login"
              className="underline text-sm text-gray-600 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-400"
            >
              Already registered?
            </Link>

            <Button className="ml-4">Register</Button>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  );
};

export default Register;
