import { NextApiRequest, NextApiResponse } from "next";
import dbConnect, { tuser } from "./_db";
import { generateJwt, login } from "./_jwt";

interface user {
  username: string;
  email: string;
  password: string;
  todos?: [];
}

export default async function SignIn(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      await dbConnect();
      const data = login.safeParse(req.body);
      if (!data.success) {
        res.status(401).json({ error: "Invalid credentials provided" });
      } else {
        const { email, password } = data.data;
        let user = await tuser.findOne({ email: email });
        if (!user) {
          res.status(401).json({ error: "User does not exist." });
        } else {
          if (user.password === password) {
            const token = generateJwt(user.email);
            req.headers.token = token as unknown as string;
            res.status(200).json({
              message: "Logged in successfully",
              token: token,
              email: email,
            });
          } else {
            res.status(401).json({ error: "Invalid password." });
          }
        }
      }
    } else {
      res.status(400).json({ error: "Invalid HTTP request" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
