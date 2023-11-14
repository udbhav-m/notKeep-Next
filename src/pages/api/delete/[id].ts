import { NextApiRequest, NextApiResponse } from "next";
import dbConnect, { todos } from "../_db";
import authentication from "../_jwt";

interface Id {
  id: string;
}

export default async function DeleteTodo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      await dbConnect();
      authentication(req, res, async () => {
        let id = req.query.id as unknown as Id;
        console.log(id);
        let deleted: boolean = req.body.deleted;
        let email = req.headers.email;
        if (!email || email === undefined) {
          res.status(404).json({ error: "email not found in headers." });
          return;
        }
        if (email && Array.isArray(email)) {
          email = email[0];
        }
        let todo = await todos.findById(id);
        if (todo) {
          todo.deleted = deleted;
          if (todo.deleted && todo.archive === true) {
            todo.archive = false;
          }
          await todo.save();
          console.log({ message: "Moved note to trash." });
          res.status(200).json({ message: "Moved note to trash." });
        } else {
          console.log({ error: "Note not found." });
          res.status(404).json({ error: "Note not found." });
        }
      });
    } catch (error: any) {
      console.log({ error: error.message });
      res.status(500).json({ error: error.message });
    }
  } else {
    console.log({ error: "Invalid HTTP request" });
    res.status(400).json({ error: "Invalid HTTP request" });
  }
}
