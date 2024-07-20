import { User } from "@prisma/client";
import { DefaultSession } from "next-auth";
import prisma from "./prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    email: string | null | undefined;
    image?: string | null;
    name?: string | null;
  }
}