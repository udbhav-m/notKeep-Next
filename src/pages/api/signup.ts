import { NextApiRequest, NextApiResponse } from "next";
import { signup } from "./_jwt";
import dbConnect, { tuser } from "./_db";

export default async function Signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      await dbConnect();
      const details = signup.safeParse(req.body);
      if (!details.success) {
        res.status(401).json({ error: "Invalid details" });
      } else {
        const { username, email, password } = details.data;
        let user = await tuser.findOne({ username: username, email: email });
        if (user && (user.username || user.email)) {
          throw new Error("User already exists with the details.");
        } else {
          let newUser = new tuser({ username, email, password });
          await newUser.save();
          res.status(200).json({
            message: `user ${username} created successfully`,
          });
        }
      }
    } else {
      res.status(400).json({ error: "Invalid HTTP request" });
    }
  } catch (error: any) {
    if (error.message.includes("duplicate key error collection")) {
      res.status(500).json({ error: "username/email already taken" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}
