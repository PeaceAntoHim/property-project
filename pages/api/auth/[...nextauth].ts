import { NextApiHandler } from 'next';
import NextAuth from "next-auth";
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GitHubProvider from 'next-auth/providers/github'
import prisma from '../../../lib/prisma';

type GitHubProviderT = {
  clientId: string;
  clientSecret: string;
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    } as GitHubProviderT),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};
