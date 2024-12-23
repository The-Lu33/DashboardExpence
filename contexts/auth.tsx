import { UserInterface } from "@/types/types";
import { createContext, PropsWithChildren, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
// import { deleteToken, getToken, saveToken } from "@/utils/session-token";
import { auth } from "@/firebaseConfig";
export interface AuthContextType {
  user: UserInterface | null;
  sessionToken: string | null;
  isLoading: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  loginWhitGoogle: () => Promise<void>;
  register: (data: {
    name: string;
    last_name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
const provider = new GoogleAuthProvider();
export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsloading] = useState(false);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [user, setUser] = useState(null);

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
      const userLogin = await signInWithEmailAndPassword(auth, email, password);
      console.log("userLogin", userLogin);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        setSessionToken(null);
      }
      console.error("Unknown error during login", error);
    } finally {
      setIsloading(false);
    }
  }
  async function loginWhitGoogle() {
    try {
      setIsloading(true);
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;

      console.log("Google Sign-In Result:", {
        user: user.uid,
        email: user.email,
        token: token,
      });

      // Update user state and session token
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);

      if (error.code === "auth/popup-closed-by-user") {
        console.log("Login popup was closed by user");
      } else {
        // Handle other errors
        console.error("Detailed Error:", error.message);
      }

      setSessionToken(null);
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
  }): Promise<void> {
    try {
      setIsloading(true);
      console.log("email", email);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("userCredential", userCredential);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error during register:", error.message);
        // return { message: error.message, session_token: null, success: false };
      }
      console.error("Unknown error during register", error);
      // return { message: "Unknown error", session_token: null, success: false };
    } finally {
      setIsloading(false);
    }
  }

  async function logout() {
    try {
      setIsloading(true);
      await signOut(getAuth());
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setIsloading(false);
    }
  }
  useEffect(() => {
    // (async () => {
    //   // const session = await getToken("session_token");
    //   // const user = await getToken("user_data");
    //   const user = null;
    //   const session = null;
    //   console.log("session", user, session);
    //   if (session && user) {
    //     setSessionToken(session);
    //     setUser(user);
    //   } else {
    //     setSessionToken(null);
    //     setUser(null);
    //   }
    // })();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        setSessionToken(null);
        setUser(null);
        return;
      }
      setUser(currentUser);
    });
    console.log("user", user);

    return () => unsubscribe();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        sessionToken,
        isLoading,
        login,
        register,
        loginWhitGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
