// app/AppNav.tsx
import useAuth from "@/hooks/useAuth";
import { Slot, useRouter } from "expo-router";
import React, { useEffect } from "react";

export default function AppNav() {
  const { userToken, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (userToken && user) {
      router.replace("(tabs)");
    } else {
      router.replace("login");
    }
  }, [userToken, user]);

  return <Slot />;
}
