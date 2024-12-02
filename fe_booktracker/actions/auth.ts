'use server'

import { AuthError } from "next-auth"
import { signIn } from "next-auth/react"

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return 'Nieprawidłowe dane logowania.'
        default:
          return 'Coś poszło nie tak.'
      }
    }
    throw error
  }
}

