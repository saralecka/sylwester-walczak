"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Ładowanie...</div>;
  }

  if (!session) {
    return null;
  }

//   TODO: Add list and modal to add
  return (
    <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="container mx-auto flex-grow p-6">
      <h1 className="text-3xl font-bold mb-6">Witaj, {session.user?.name || "użytkowniku"}!</h1>
      <div className="space-y-4">
        <p className="text-lg">Zarządzaj swoimi książkami w jednym miejscu!</p>
        <Button onClick={() => console.log("Dodaj książkę!")}>Dodaj książkę</Button>
      </div>
    </main>
  </div>
  );
}
