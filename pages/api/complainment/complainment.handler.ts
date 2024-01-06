import prisma from "../../../lib/prisma";
import { Prisma } from "@prisma/client";

export default async function handle(
  req: { method: string },
  res: { status: (arg0: number) => { (): any; new (): any; json: { (arg0: { message: string }): any; new (): any } } }
) {
  if (req.method === "POST") {
    // create user
    await createcomplaint(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}

async function createcomplaint(req: { method?: string; body?: any }, res: { status: any }) {
  let errors = [];
  const { userId, addresses, categoryComplaint, notes } = req.body;
  if (!userId || !addresses || !categoryComplaint || !notes) {
    errors.push("invalid inputs, check again");
    return res.status(400).json({ status: 400, errors });
  }

  try {
    const complaint = await prisma.complaint.create({
      data: { ...req.body },
    });
    return res.status(201).json({ complaint });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(400).json({ message: e.message });
      }
      return res.status(400).json({ message: e.message });
    }
  }
}
