import { BASE_URL_API } from "@/constants/url";
import { UserInterface } from "@/types/types";
import { createContext, PropsWithChildren, useState, useEffect } from "react";
import { deleteToken, getToken, saveToken } from "@/utils/session-token";
export interface AuthContextType {
  user: UserInterface | null;
  sessionToken: string | null;
  isLoading: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: {
    name: string;
    last_name: string;
    email: string;
    password: string;
  }) => Promise<{
    session_token: string | null;
    success: boolean;
    message: string;
  }>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsloading] = useState(false);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserInterface | null>(null);



  async function login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      setIsloading(true);
      console.log("init login");
      const body = JSON.stringify({ email, password });
      const res = await fetch(`${BASE_URL_API}/api/auth/login`, {
        method: "POST",
        body,
      });
      const result = await res.json();
      if (res.ok) {
        if (result.data.session_token) {
          await saveToken("session_token", result.data.session_token);
          await saveToken("user_data", result.data.user);
          setSessionToken(result.data.session_token);
          setUser(result.data.user);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        setSessionToken(null);
      }
    } finally {
      setIsloading(false);
    }
  }

  async function register({
    name,
    last_name,
    email,
    password,
  }: {
    name: string;
    last_name: string;
    email: string;
    password: string;
  }): Promise<{
    session_token: string | null;
    success: boolean;
    message: string;
  }> {
    try {
      setIsloading(true);
      const body = JSON.stringify({
        name,
        last_name,
        email,
        password,
      });

      const res = await fetch(`${BASE_URL_API}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (res.ok) {
        const result = await res.json();
        if (result.data.session_token) {
          await saveToken("session_token", result.data.session_token);
          await saveToken("user_data", result.data.user);
          setSessionToken(result.data.session_token);
          setUser(result.data.user);
        }

        return {
          session_token: result.message,
          success: true,
          message: "Register success",
        };
      } else {
        const result = await res.json();
        return {
          session_token: result.session_token,
          success: false,
          message: "Failed to register",
        };
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error during register:", error.message);
        return { message: error.message, session_token: null, success: false };
      }
      console.error("Unknown error during register");
      return { message: "Unknown error", session_token: null, success: false };
    } finally {
      setIsloading(false);
    }
  }

  async function logout() {
    try {
      setIsloading(true);
      const token = await getToken('session_token')
      const body = JSON.stringify({ token });
      const res = await fetch(`${BASE_URL_API}/api/auth/logout`, {
        method: "POST",
        body,
      });
      if (res.ok) {
        await deleteToken("user_data");
        await deleteToken("session_token");

        setSessionToken(null);
        setUser(null);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setIsloading(false);
    }
  }
  useEffect(() => {
    (async () => {
      const session = await getToken("session_token");
      const user = await getToken("user_data");
      console.log("session", user, session);
      if (session && user) {
        setSessionToken(session);
        setUser(user);
      } else {
        setSessionToken(null);
        setUser(null);
      }
    })();
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, sessionToken, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
