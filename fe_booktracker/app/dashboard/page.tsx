"use client";

import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Navbar } from "@/components/Navbar";
import { BookList } from "@/components/BookList";

import { Loader } from "@/components/Loader";
import { AddBookModal } from "@/components/AddBookModal";

export default function DashboardPage() {
  const [refetch, setRefetch] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (refetch) {
      setRefetch(false);
    }
  }, [refetch]);

  if (status === "loading") {
    return <Loader />;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container mx-auto flex-grow p-6">
        <h1 className="text-3xl font-bold mb-6">
          Witaj, {session.user?.username || "użytkowniku"}!
        </h1>
        <div className="space-y-4">
          <p className="text-lg">
            Zarządzaj swoimi książkami w jednym miejscu!
          </p>
          <AddBookModal onBookAdded={() => setRefetch(true)} />

          <BookList refetch={refetch} />
        </div>
      </main>
    </div>
  );
}
