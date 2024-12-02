import { signIn, SignInOptions } from "next-auth/react";

const formDataToObject = (formData: FormData): Record<string, string> => {
  const formObject: Record<string, string> = {};
  formData.forEach((value, key) => {
    formObject[key] = value.toString();
  });
  return formObject;
};

export async function authenticate(
  formData: FormData
): Promise<string | undefined> {
  try {
    const formObject = formDataToObject(formData);
    await signIn("credentials", formObject as SignInOptions);
  } catch (error) {
    if (error instanceof Error) {
      if ((error as any).type === "CredentialsSignin") {
        return "Nieprawidłowe dane logowania.";
      } else {
        return "Coś poszło nie tak.";
      }
    }
    throw error;
  }
}
