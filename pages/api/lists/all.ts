import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { supabase } from "../../../lib/supabase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { data } = await supabase
        .from("lists")
        .select("*")
        .eq("owner", req.body.owner);

      res.status(200).json(data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).statusMessage = "some shit went wrong";
  }
};

export default handler;
