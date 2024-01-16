import { axiosOwnServer } from "@/lib/axios";

export const getFeaturedProperties = async () => {
  const { data } = await axiosOwnServer.get("/properties/featured.handler");
  console.log(data.hits);
  return data.hits;
};
