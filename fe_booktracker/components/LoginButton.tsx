"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LoginButton() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    return <Button onClick={() => signOut()}>Wyloguj</Button>;
  }

  return (
    <Button
      onClick={() => {
        router.push("/login");
      }}
    >
      Zaloguj
    </Button>
  );
}
