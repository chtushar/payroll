import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { supabase } from "../../../../lib/supabase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    if (req.method === "GET") {
      const data = await supabase.from("addresses").delete().eq("id", id);
      res.status(200).json(data.data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).statusMessage = "some shit went wrong";
  }
};

export default handler;
