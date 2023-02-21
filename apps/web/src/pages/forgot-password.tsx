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
import { useState } from "react";

const ForgotPassword = () => {
  const { forgotPassword } = useAuth({ middleware: "guest" });

  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<any>([]);
  const [status, setStatus] = useState<string | null>(null);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    forgotPassword({ email, setErrors, setStatus });
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
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-200">
          Forgot your password? No problem. Just let us know your email address
          and we will email you a password reset link that will allow you to
          choose a new one.
        </div>

        {/* Session Status */}
        <AuthSessionStatus className="mb-4" status={status} />

        <form onSubmit={submitForm}>
          {/* Email Address */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={email}
              className="block mt-1 w-full"
              onChange={(event) => setEmail(event.target.value)}
              required
              autoFocus
            />

            <InputError messages={errors.email} className="mt-2" />
          </div>

          <div className="flex items-center justify-end mt-4">
            <Button>Email Password Reset Link</Button>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  );
};

export default ForgotPassword;
