import { axiosOwnServer } from "@/lib/axios";

export const getProperty = async (id: string | string[]) => {
  const { data } = await axiosOwnServer.get("/properties/detail.handler", {
    params: { externalID: id },
  });

  return data;
};
