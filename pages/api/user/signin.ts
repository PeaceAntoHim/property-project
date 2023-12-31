import { SHA256 as sha256 } from "crypto-js";
import prisma from "../../../lib/prisma";

export default async function handle(req: { method: string }, res: { status: (arg0: number) => any }) {
  if (req.method === "POST") {
    await loginUserHandler(req, res);
  } else {
    return res.status(405);
  }
}

async function loginUserHandler(req: { method?: string; body?: any }, res: { status: any }) {
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

    if (user && user.password === hashPassword(password)) {
      return res.status(200).json(exclude(user, ["password"]));
    } else {
      return res.status(401).json({ message: "invalid credentials" });
    }
  } catch (e: any) {
    console.error(e);
    throw new Error(e);
  }
}

const hashPassword = (password: string) => {
  return sha256(password).toString();
};

function exclude(
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
