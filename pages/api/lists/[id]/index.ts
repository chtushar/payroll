import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { supabase } from "../../../../lib/supabase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      const { id } = req.query;
      const data = await supabase
        .from("addresses")
        .select("*")
        .eq("list_id", id);

      res.status(200).json(data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).statusMessage = "some shit went wrong";
  }
};

export default handler;
