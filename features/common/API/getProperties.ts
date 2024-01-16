import { axios } from "@/lib/axios";

export const getProperties = async (num: number) => {
  const { data } = await axios.get("/properties/list", {
    params: {
      locationExternalIDs: "5002,6020",
      purpose: "for-rent",
      hitsPerPage: num,
      page: "0",
      lang: "en",
      sort: "city-level-score",
      hasVideo: true,
      hasFloorPlan: true,
      hasPanorama: true,
    },
  });
  console.log(data.hits);
  return data.hits;
};
