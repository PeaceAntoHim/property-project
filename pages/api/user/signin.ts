import { SHA256 as sha256 } from "crypto-js";
import prisma from "../../../lib/prisma";
import { sign } from "jsonwebtoken";

class Signin {
  async loginUserHandler(req: { method?: string; body?: any }, res: { status: any; setHeader: any }) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "invalid input" });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { email: email },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          password: true,
        },
      });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      if (user && user.password === this.hashPassword(password)) {
        const tokenData = this.createToken(user);
        const cookie = this.createCookies(tokenData);
        res.setHeader("Set-Cookie", [cookie]);
        const payload = {
          user: this.exclude(user, ["password"]),
          auth: tokenData,
        };
        return res.status(200).json(payload);
      } else {
        return res.status(401).json({ message: "invalid credentials" });
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e);
    }
  }

  private createToken = (user: any) => {
    const dataStoredInToken = { _id: user.id };
    const secretKey: string = process.env.NEXTAUTH_SECRET as string;
    const expiresIn = 60 * 60;
    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  };

  private createCookies = (tokenData: { expiresIn: number; token: string }) => {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn} Secure; SameSite=None;`;
  };

  private hashPassword = (password: string) => {
    return sha256(password).toString();
  };

  private exclude(
    user: {
      [x: string]: any;
      id?: string;
      name?: string | null;
      email?: string | null;
      emailVerified?: Date | null;
      image?: string | null;
      createdAt?: Date;
      updatedAt?: Date;
    },
    keys: string[]
  ) {
    for (let key of keys) {
      delete user[key];
    }
    return user;
  }
}

export default async function handle(
  req: { method: string },
  res: { status: (arg0: number) => any; setHeader: (arg1: any) => any }
) {
  const initSignin = new Signin();
  if (req.method === "POST") {
    await initSignin.loginUserHandler(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}
