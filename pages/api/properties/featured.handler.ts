import type { NextApiRequest, NextApiResponse } from "next";
import featuredProperties from "../../../lib/data/featuredProperties.json";

type FeaturedPropertiesData = {
  hits: {
    id: number;
    ownerID: number;
    userExternalID: string;
    sourceID: number;
    state: string;
    _geoloc: { lat: number; lng: number };
    geography: { lat: number; lng: number };
    purpose: string;
    price: number;
    product: string;
    // Add other properties based on your actual data structure
    _highlightResult: {
      /* ... */
    };
  }[];
  // Add other properties based on your actual data structure
};

type ResponseData = FeaturedPropertiesData | { message: string };

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    // Ensure that the structure of the data matches the FeaturedPropertiesData type
    const responseData: FeaturedPropertiesData = {
      hits: featuredProperties.hits,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching featured properties:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
