import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { CagoAPIError, getCagoRequest } from "utils";

interface Token {
  access: string;
}

interface User {
  id: number;
  token: string;
}

export const login = async (email: string, password: string) => {
  try {
    const data = await getCagoRequest<Token>("post")("/auth/login/", {
      email: email,
      password: password,
    });

    // Update with the new access token.
    mutate("/auth/refresh/", data, { revalidate: false });
  } catch (error) {
    if (axios.isAxiosError<CagoAPIError>(error)) {
      if (error.response?.status === 401) {
        throw Error("이메일 또는 비밀번호가 잘못되었습니다.");
      }
    }
  }
};

export const logout = async () => {
  // TODO: Implement logout API.
  await getCagoRequest()("/auth/logout/");

  mutate("/auth/refresh/", undefined, { revalidate: false });
};

export const signup = async (email: string, password: string, passwordConfirm: string) => {
  try {
    await getCagoRequest<{ id: number; email: string }>("post")("/auth/signup/", {
      email,
      password,
      password_confirm: passwordConfirm,
    });
  } catch (error) {
    if (axios.isAxiosError<CagoAPIError>(error)) {
      const { errors } = error.response?.data!;
      if (errors.some((v) => v.code === "unique")) {
        throw Error("중복된 이메일입니다.");
      }
    }
  }
};

/**
 * A handy hook for user authorization.
 */
export const useAuth = () => {
  const { data, error, mutate } = useSWR<Token, AxiosError>("/auth/refresh/", getCagoRequest("post"), {
    shouldRetryOnError: false,
  });

  const [user, setUser] = useState<User>();

  const loggedIn = !!data;
  const loading = !data && !error;

  useEffect(() => {
    if (data) {
      // Get payload from the access token.
      const { access: token } = data;
      const payload = JSON.parse(window.atob(token.split(".")[1]));
      const now = Math.floor(Date.now() / 1000);

      // Check whether the token is still valid.
      if (now < payload.exp) {
        setUser({ id: payload.user_id, token });
      } else {
        // Refresh if expired.
        mutate();
      }
    }
  }, [data, mutate]);

  return { loading, loggedIn, user };
};

/**
 * Redirect to the url if the user is logged out.
 */
export const useRequireLogin = (url: string) => {
  const { loading, loggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    router.prefetch(url);

    if (!loading && !loggedIn) {
      router.replace(url);
    }
  }, [loading, loggedIn, url, router]);
};

/**
 * Redirect to the url if the user is logged in.
 */
export const useRequireLogout = (url: string) => {
  const { loggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    router.prefetch(url);

    if (loggedIn) {
      router.replace(url);
    }
  }, [loggedIn, url, router]);
};
