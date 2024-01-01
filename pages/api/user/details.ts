import prisma from "../../../lib/prisma";

export default async function handle(req: { method: string }, res: { status: (arg0: number) => any }) {
  if (req.method === "POST") {
    await detailUserHandler(req, res);
  } else {
    return res.status(405);
  }
}

async function detailUserHandler(req: { method?: string; body?: any }, res: { status: any }) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "User not found." });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        payments: true,
        complaints: true,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    return res.status(200).json(exclude(user));
  } catch (e: any) {
    console.error(e);
    throw new Error(e);
  }
}

function exclude(user: {
  [x: string]: any;
  id?: string;
  name?: string | null;
  email?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}) {
  return user;
}
