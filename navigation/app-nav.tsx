// app/AppNav.tsx
import useAuth from "@/hooks/useAuth";
import { Slot, useRouter } from "expo-router";
import React, { useEffect } from "react";

export default function AppNav() {
  const { userToken, user } = useAuth();
  const router = useRouter();

  // console.log(userToken, user);
  useEffect(() => {
    if (!userToken && !user) {
      router.replace("login");
    } else {
      router.replace("home");
    }
  }, [userToken, user]);

  return <Slot />;
}
