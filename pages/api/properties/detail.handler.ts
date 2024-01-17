import type { NextApiRequest, NextApiResponse } from "next";
import mappingProperty from "../../../lib/data/property.json";

type Property = {
  id: number;
  // Add other properties based on your actual data structure
};

type ResponseData = Property | { message: string };

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const externalID = req.query?.externalID || "4947528";

  if (!externalID) {
    return res.status(400).json({ message: "External ID not provided" });
  }

  if (typeof externalID !== "string") {
    return res.status(400).json({ message: "External ID should be a string" });
  }

  const property = mappingProperty[externalID as keyof typeof mappingProperty];

  if (!property) {
    // Property not found, send a 404 response
    return res.status(404).json({ message: "Property not found" });
  }

  res.status(200).json(property);
}
