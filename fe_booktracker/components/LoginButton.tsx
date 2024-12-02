"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return <Button onClick={() => signOut()}>Wyloguj</Button>;
  }
  return <Button onClick={() => signIn()}>Zaloguj</Button>;
}
