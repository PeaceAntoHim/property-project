import type { NextApiRequest, NextApiResponse } from "next";
import featuredProperties from "../../../lib/data/featuredProperties.json";

type FeaturedProperties = {
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

type ResponseData = FeaturedProperties | { message: string };

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  res.status(200).json(featuredProperties);
}
