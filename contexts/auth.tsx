import { BASE_URL_API } from "@/constants/url";
import { UserInterface } from "@/types/types";
import { createContext, PropsWithChildren, useState } from "react";
export interface AuthContextType {
  user: UserInterface | null;
  userToken: string;
  isLoading: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: {
    name: string;
    last_name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsloading] = useState(false);
  const [userToken, setUserToken] = useState("");
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

      const body = JSON.stringify({ email, password });
      const res = await fetch(`${BASE_URL_API}/api/auth`, {
        method: "POST",
        body,
      });
      if (res.ok) {
        const result = await res.json();
        setUserToken(result.token);
        setUser(result.user);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        setUserToken("");
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
  }) {
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
        body,
      });
      if (res.ok) {
        const result = await res.json();
      }
    } catch (error) {
      if (error instanceof Error) {
      }
    } finally {
      setIsloading(false);
    }
  }
  async function logout() {
    try {
      setIsloading(true);

      const toke = "";
      const body = JSON.stringify({
        toke,
      });
      const res = await fetch(`${BASE_URL_API}/api/auth/logout`, {
        method: "POST",
        body,
      });
      if (res.ok) {
        setUserToken("");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setIsloading(false);
    }
  }
  return (
    <AuthContext.Provider
      value={{ user, userToken, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
