import prisma from "../../../lib/prisma";
import { Prisma } from "@prisma/client";

class Booking {
  async createBooking(req: { method?: string; body?: any }, res: { status: any }) {
    let errors = [];
    const { name, phoneNumber, email, message } = req.body;
    if (!name || !phoneNumber || !email || !message) {
      errors.push("invalid inputs, check again");
      return res.status(400).json({ status: 400, errors });
    }

    try {
      const booking = await prisma.booking.create({
        data: { ...req.body },
      });
      return res.status(201).json({ booking });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          return res.status(400).json({ message: e.message });
        }
        return res.status(400).json({ message: e.message });
      }
    }
  }

  async getBookings(req: { method?: string; query?: any }, res: { status: any }) {
    try {
      // Retrieve complaints based on the user ID (if provided)
      const bookings = await prisma.booking.findMany({
        where: {},
      });

      res.status(200).json(bookings);
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
  const initBooking = new Booking();
  if (req.method === "POST") {
    // create user
    await initBooking.createBooking(req, res);
  } else {
    // return res.status(405).json({ message: "Method Not allowed" });
    await initBooking.getBookings(req, res);
  }
}
