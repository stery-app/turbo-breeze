import ApplicationLogo from "@/components/application-logo";
import AuthCard from "@/components/auth-card";
import Button from "@/components/button";
import GuestLayout from "@/components/layouts/guest-layout";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import { useState } from "react";

type VerificationSentProps = {
  sent?: boolean;
};
const VerificationSent = ({ sent }: VerificationSentProps) => {
  if (typeof sent === "undefined" || !sent) {
    return null;
  }

  return (
    <div className="mb-4 font-medium text-sm text-green-600">
      A new verification link has been sent to the email address you provided
      during registration.
    </div>
  );
};

const VerifyEmail = () => {
  const { logout, resendEmailVerification } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: "/dashboard",
  });

  const [status, setStatus] = useState<string | null>(null);

  return (
    <GuestLayout>
      <AuthCard
        logo={
          <Link href="/">
            <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
          </Link>
        }
      >
        <div className="mb-4 text-sm text-gray-600">
          Thanks for signing up! Before getting started, could you verify your
          email address by clicking on the link we just emailed to you? If you
          didn't receive the email, we will gladly send you another.
        </div>

        <VerificationSent sent={status === "verification-link-sent"} />

        <div className="mt-4 flex items-center justify-between">
          <Button onClick={() => resendEmailVerification({ setStatus })}>
            Resend Verification Email
          </Button>

          <button
            type="button"
            className="underline text-sm text-gray-600 hover:text-gray-900"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </AuthCard>
    </GuestLayout>
  );
};

export default VerifyEmail;
