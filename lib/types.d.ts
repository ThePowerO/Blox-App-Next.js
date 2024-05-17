import { User } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: User["id"];
      email: User["email"];
      image: User["image"];
      name: User["name"];
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    user: {
      id: User["id"];
      email: User["email"];
      image: User["image"];
      name: User["name"];
    }
  }
}