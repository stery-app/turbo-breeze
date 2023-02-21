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

const PasswordReset = () => {
  const router = useRouter();

  const { resetPassword } = useAuth({ middleware: "guest" });

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [errors, setErrors] = useState<any>([]);
  const [status, setStatus] = useState(null);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    resetPassword({
      email,
      password,
      password_confirmation: passwordConfirmation,
      setErrors,
      setStatus,
    });
  };

  useEffect(() => {
    setEmail((router.query.email as string) || "");
  }, [router.query.email]);

  return (
    <GuestLayout>
      <AuthCard
        logo={
          <Link href="/">
            <ApplicationLogo
              type="inline"
              className="h-16 object-contain text-gray-500"
            />
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
            <Button>Reset Password</Button>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  );
};

export default PasswordReset;
