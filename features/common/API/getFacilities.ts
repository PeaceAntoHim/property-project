import { axiosOwnServer } from "@/lib/axios";

export const getFacilities = async () => {
  const { data } = await axiosOwnServer.get("/facilities");
  return data;
};
