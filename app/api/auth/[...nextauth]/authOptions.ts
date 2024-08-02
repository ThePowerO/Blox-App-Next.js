import { AuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from 'next-auth/providers/discord';
import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from 'bcrypt';

export const authOptions: AuthOptions = {
  pages: {
    signIn: `/`,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: { label: 'Username Here', type: 'text', placeholder: 'Username' },
        password: { label: 'Password', type: 'password'}
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.name
          },
        });

        if (!user) throw new Error('Invalid information');

        if (!credentials?.password) throw new Error('Invalid information');

        if (user.password) {
          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordCorrect) throw new Error('Invalid information');
        }

        if (!user.emailVerified) throw new Error('Please verify your email. Check Email Box');

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      },
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.image = user.image;
        token.name = user.name;
      }
      if (user) {
        // saving user if not there yet
        const existingUser = await prisma.user.findUnique({
          where: { id: user.id },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              ...user,
              name: user.name!,
            },
          });
        }
      }
      return token;
    },

    async session({ token, session, user }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.name = token.name;
      }

      return session;
    }
  },
};