import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { supabase } from "../../../../lib/supabase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    if (req.method === "POST") {
      const data = await supabase.from("addresses").insert({
        address: req.body.address,
        chain_id: req.body.chain,
        list_id: id,
        amount: req.body.amount,
      });

      res.status(200).json(data.data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).statusMessage = "some shit went wrong";
  }
};

export default handler;
