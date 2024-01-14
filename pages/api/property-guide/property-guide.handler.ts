import prisma from "../../../lib/prisma";
import { Prisma } from "@prisma/client";

class PropertyGuide {
  async createPropertyGuide(req: { method?: string; body?: any }, res: { status: any }) {
    const errors = [];
    const { name, phoneNumber, email } = req.body;
    if (!name || !phoneNumber || !email) {
      errors.push("invalid inputs, check again");
      return res.status(400).json({ status: 400, errors });
    }

    try {
      await prisma.pdfGuide.create({
        data: { ...req.body },
      });
      return res.status(201).json({ message: "Sucess download pdf" });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          return res.status(400).json({ message: e.message });
        }
        return res.status(400).json({ message: e.message });
      }
    }
  }

  async getPropertyGuides(req: { method?: string; query?: any }, res: { status: any }) {
    try {
      // Retrieve complaints based on the user ID (if provided)
      const payments = await prisma.payment.findMany({
        where: {},
      });
      // You can add more logic here, like handling different HTTP methods, error checking, etc.

      res.status(200).json(payments);
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
  const initPropertyGuide = new PropertyGuide();
  if (req.method === "POST") {
    // create user
    await initPropertyGuide.createPropertyGuide(req, res);
  } else {
    await initPropertyGuide.getPropertyGuides(req, res);
  }
}
