import useSWR from "swr";
import axios from "@/lib/axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { UserType } from "@/types";

type AuthProps = {
  middleware: "auth" | "guest";
  redirectIfAuthenticated?: string;
};

type RegisterProps = {
  name?: string;
  email?: string;
  password?: string;
  remember?: boolean;
  password_confirmation?: string;
  setErrors?:
    | ((e: any[]) => void)
    | React.Dispatch<React.SetStateAction<never[] | any>>;
  setStatus?:
    | ((e: string | null) => void)
    | React.Dispatch<React.SetStateAction<never[] | any>>;
};

type ForgotPasswordProps = RegisterProps & {
  email: string;
};

export const useAuth = (
  { middleware, redirectIfAuthenticated }: AuthProps = { middleware: "guest" }
) => {
  const router = useRouter();

  const {
    data: user,
    error,
    mutate,
  } = useSWR<UserType>("/api/user", () =>
    axios
      .get("/api/user")
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;

        router.push("/verify-email");
      })
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const register = async ({ setErrors, ...props }: RegisterProps) => {
    await csrf();

    if (typeof setErrors === "function") {
      setErrors([]);
    }

    axios
      .post("/register", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;
        if (typeof setErrors === "function") {
          setErrors(error.response.data.errors);
        }
      });
  };

  const login = async ({ setErrors, setStatus, ...props }: RegisterProps) => {
    await csrf();
    if (typeof setErrors === "function") {
      setErrors([]);
    }
    if (typeof setStatus === "function") {
      setStatus(null);
    }

    axios
      .post("/login", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        if (typeof setErrors === "function") {
          setErrors(error.response.data.errors);
        }
      });
  };

  const forgotPassword = async ({
    setErrors,
    setStatus,
    email,
  }: ForgotPasswordProps) => {
    await csrf();

    if (typeof setErrors === "function") {
      setErrors([]);
    }
    if (typeof setStatus === "function") {
      setStatus(null);
    }

    axios
      .post("/forgot-password", { email })
      .then((response) => {
        if (typeof setStatus === "function") {
          setStatus(response.data.status);
        }
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;
        if (typeof setErrors === "function") {
          setErrors(error.response.data.errors);
        }
      });
  };

  const resetPassword = async ({
    setErrors,
    setStatus,
    ...props
  }: RegisterProps) => {
    await csrf();

    if (typeof setErrors === "function") {
      setErrors([]);
    }
    if (typeof setStatus === "function") {
      setStatus(null);
    }

    axios
      .post("/reset-password", { token: router.query.token, ...props })
      .then((response) =>
        router.push("/login?reset=" + window.btoa(response.data.status))
      )
      .catch((error) => {
        if (error.response.status !== 422) throw error;
        if (typeof setErrors === "function") {
          setErrors(error.response.data.errors);
        }
      });
  };

  const resendEmailVerification = ({ setStatus }: RegisterProps) => {
    axios.post("/email/verification-notification").then((response) => {
      if (typeof setStatus === "function") {
        setStatus(response.data.status);
      }
    });
  };

  const logout = async () => {
    if (!error) {
      await axios.post("/logout").then(() => mutate());
    }

    window.location.pathname = "/login";
  };

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated);
    if (window.location.pathname === "/verify-email" && user?.email_verified_at)
      router.push(redirectIfAuthenticated as string);
    if (middleware === "auth" && error) logout();
  }, [user, error]);

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  };
};
