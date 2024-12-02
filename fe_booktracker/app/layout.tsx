import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Book tracker",
  description: "Book tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <Providers>
          <main className="flex min-h-screen flex-col items-center justify-center p-24">
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
