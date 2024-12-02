import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Zaloguj się</h1>
      <LoginForm />
    </div>
  );
}
