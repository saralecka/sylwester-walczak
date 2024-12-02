'use client'

import { useSession } from "next-auth/react"
import LoginButton from "@/components/LoginButton"
import Link from "next/link"

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Book tracker</h1>
      <LoginButton />
      {session ? (
        <>
          <p className="mt-4">Zalogowany jako: {session.user?.username}</p>
          <Link href="/dashboard">
            <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Przejdź do panelu
            </button>
          </Link>
        </>
      ) : (
        <p className="mt-4">Zaloguj się, aby uzyskać dostęp do panelu.</p>
      )}
    </div>
  )
}
