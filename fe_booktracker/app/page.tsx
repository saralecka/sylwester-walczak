'use client'

import { useSession } from "next-auth/react"
import LoginButton from "@/components/LoginButton"

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Book tracker</h1>
      <LoginButton />
      {session && (
        <p className="mt-4">Zalogowany jako: {session.user?.email}</p>
      )}
    </div>
  )
}
