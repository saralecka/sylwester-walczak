"use client";

import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
  const { data: session } = useSession();
  const username = session?.user?.username || "Użytkownik";
 // TODO: Fix types
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  const initials = username
    .split(" ")
    .map((username) => username[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <nav className="bg-primary text-primary-foreground w-full shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Book Tracker</div>
        <div className="flex items-center space-x-4">
          <span>Witaj, {username}!</span>
          <Avatar>
            <AvatarImage
              src={`https://source.boringavatars.com/beam/120/${username}?colors=${randomColor}`}
            />
            <AvatarFallback style={{ backgroundColor: `#${randomColor}` }}>
              {initials}
            </AvatarFallback>
          </Avatar>
          <button
            onClick={() => signOut()}
            className="text-sm bg-secondary text-secondary-foreground py-1 px-3 rounded-md hover:bg-secondary-hover"
          >
            Wyloguj
          </button>
        </div>
      </div>
    </nav>
  );
}
