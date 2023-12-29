import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import prisma from "../../../lib/prisma";

type TGitHubProvider = {
  clientId: string;
  clientSecret: string;
};

// Define the User type
type TUser = {
  id: number;
  email: string;
  name: string;
};

// Define the Session type
type TSession = {
  user: TUser;
};

// Define the Token type
type TToken = {
  accessToken: string;
};

const authHandler = (req: any, res: any) => NextAuth(req, res, options);
export default authHandler;

let userAccount;
const options: any = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      async authorize(credentials: Record<string, string>, req: Request) {
        const userCredentials = {
          email: credentials.email,
          password: credentials.password,
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/login`, {
          method: "POST",
          body: JSON.stringify(userCredentials),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const user = await res.json();

        if (res.ok && user) {
          userAccount = user;
          console.log(userAccount);
          return user;
        } else {
          return null;
        }
      },
    } as TGitHubProvider),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30,
    encryption: true,
  },

  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },

  callbacks: {
    async session(session: TSession, user: TUser | null, token: TToken): Promise<TSession> {
      if (user !== null) {
        console.info("User Account ", user);
        session.user = user;
      }
      console.info(session, "as session user");
      return await session;
    },

    async jwt({ token, user }: { token: TToken; user: TUser }): Promise<TToken> {
      const isSignedIn = !!user;

      if (isSignedIn) {
        token.accessToken = `${user.id.toString()}-${user.email}-${user.name}`;
      }

      return await token;
    },
  },
};
