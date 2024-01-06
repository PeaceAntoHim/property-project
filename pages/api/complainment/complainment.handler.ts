import prisma from "../../../lib/prisma";
import { Prisma } from "@prisma/client";

class Complaint {
  async createComplaint(req: { method?: string; body?: any }, res: { status: any }) {
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

  async getComplaints(req: { method?: string; query?: any }, res: { status: any }) {
    try {
      const userId = req.query?.userId; // Assuming you pass the user ID in the request parameters

      // Check if user ID is provided
      const whereCondition = userId ? { userId: userId } : {};

      // Retrieve complaints based on the user ID (if provided)
      const complaints = await prisma.complaint.findMany({
        where: whereCondition,
      });

      // You can add more logic here, like handling different HTTP methods, error checking, etc.

      res.status(200).json(complaints);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default async function handle(
  req: { method: string },
  res: { status: (arg0: number) => { (): any; new (): any; json: { (arg0: { message: string }): any; new (): any } } }
) {
  const initComplaint = new Complaint();
  if (req.method === "POST") {
    // create user
    await initComplaint.createComplaint(req, res);
  } else {
    // return res.status(405).json({ message: "Method Not allowed" });
    await initComplaint.getComplaints(req, res);
  }
}
