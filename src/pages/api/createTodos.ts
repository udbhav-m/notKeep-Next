import { NextApiRequest, NextApiResponse } from "next";
import dbConnect, { todos, tuser } from "./_db";
import authentication, { todoStructure } from "./_jwt";

export default function CreateTodos(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      authentication(req, res, async () => {
        await dbConnect();
        const userEmail = req.headers.email;
        if (!userEmail && userEmail === undefined) {
          res.status(401).json({ error: "Authentication failed." });
        } else {
          let userExists = await tuser.findOne({ email: userEmail });
          if (userExists) {
            const todoData = todoStructure.safeParse(req.body);
            if (!todoData.success) {
              res.status(400).json({ error: "Invalid data provided." });
            } else {
              const { title, description } = todoData.data;
              const newTodo = new todos({
                title,
                description,
              });
              await newTodo.save();
              let existingTodos = userExists.my_todos;
              existingTodos.push(newTodo);
              await userExists.save();
              res.status(200).json({ message: "Note created" });
            }
          } else {
            throw new Error(`user ${userEmail} does not exist.`);
          }
        }
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: "Invalid HTTP request" });
  }
}
