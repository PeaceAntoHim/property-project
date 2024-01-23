import { axios } from "@/lib/axios";
import { getFeaturedProperties } from "./getFeaturedProperties";

export const getProperties = async (num: number) => {
  const featuredProperties: Array<Record<string, string>> = await getFeaturedProperties();
  // const { data } = await axios.get("/properties/list", {
  //   params: {
  //     locationExternalIDs: "5002,6020",
  //     purpose: "for-rent",
  //     hitsPerPage: num,
  //     page: "0",
  //     lang: "en",
  //     sort: "city-level-score",
  //     hasVideo: true,
  //     hasFloorPlan: true,
  //     hasPanorama: true,
  //   },
  // });
  // const properties: Array<Record<string, string>> = data.hits;
  // const combinedProperties = [...featuredProperties, ...properties];
  return featuredProperties;
};
