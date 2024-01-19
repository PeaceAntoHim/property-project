import type { NextApiRequest, NextApiResponse } from "next";
import mappingProperty from "../../../lib/data/property.json";
import { axios } from "@/lib/axios";

type Property = {
  id: number;
  // Add other properties based on your actual data structure
};

type ResponseData = Property | { message: string };

const getLiveProperty = async (id: string): Promise<ResponseData> => {
  const { data } = await axios.get("/properties/detail", {
    params: { externalID: id },
  });

  return data;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const externalID = req.query?.externalID || "4947520";

  if (!externalID) {
    return res.status(400).json({ message: "External ID not provided" });
  }

  if (typeof externalID !== "string") {
    return res.status(400).json({ message: "External ID should be a string" });
  }

  const property = mappingProperty[externalID as keyof typeof mappingProperty];

  if (!property) {
    // Property not found, send a 404 response
    const getProperty = await getLiveProperty(externalID);
    return res.status(200).json(getProperty);
  }

  res.status(200).json(property);
}
