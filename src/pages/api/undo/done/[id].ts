import { NextApiRequest, NextApiResponse } from "next";
import dbConnect, { todos } from "../../_db";
import authentication from "../../_jwt";

export default async function DoneTodo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      await dbConnect();
      authentication(req, res, async () => {
        let id = req.query.id as unknown as string;
        let done: boolean = req.body.done;
        let email = req.headers.email;
        if (!email || email === undefined) {
          res.status(404).json({ error: "email not found in headers." });
          return;
        }
        if (email && Array.isArray(email)) {
          email = email[0];
        }
        let todo = await todos.findById(id);
        if (todo.done === true) {
          todo.done = done;

          await todo.save();
          res.status(200).json({ message: "Archived note." });
        } else {
          res.status(404).json({ error: "Note not found." });
        }
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: "Invalid HTTP request" });
  }
}
