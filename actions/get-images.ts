import { Params, Response } from "@/types/wallpaper";
import qs from "query-string";
import { toast } from "react-hot-toast";

const URL = `${process.env.WEB_SERVER_URL}/wallpaper`;

const getImages = async (params?: Params): Promise<Response | undefined> => {
  try {
    let queryString = "";

    if (params) {
      queryString = qs.stringify({
        page: params.page,
        pageSize: params.pageSize,
        where: params.where,
      });
    }

    const res = await fetch(`${URL}?${queryString}`);
    if (!res.ok) {
      toast.error("Something went wrong!");
      return;
    }
    return res.json();
  } catch (error) {
    toast.error("Something went wrong!");
  }
};

export default getImages;
