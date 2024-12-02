import NextAuth from "next-auth";
import { authOptions } from "@/utils/authOptions";

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
