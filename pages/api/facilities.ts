import type { NextApiRequest, NextApiResponse } from "next";
import facilities from "../../lib/data/facilities.json";

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    // Ensure that the structure of the data matches the facilitiesData type
    const responseData = {
      facilities,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching featured properties:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
