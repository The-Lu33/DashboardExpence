// app/AppNav.tsx
import useAuth from "@/hooks/useAuth";
import { Slot, useRouter } from "expo-router";
import React, { useEffect } from "react";

export default function AppNav() {
  const { sessionToken, user } = useAuth();
  const router = useRouter();

  // console.log(userToken, user);
  useEffect(() => {
    if (!sessionToken && !user) {
      router.replace("/(auth)/login");
    } else {
      router.replace("/(tabs)/explore");
    }
  }, [sessionToken, user]);

  return <Slot />;
}
