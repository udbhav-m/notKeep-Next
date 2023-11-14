import { NextApiRequest, NextApiResponse } from "next";
import authentication from "./_jwt";
import dbConnect, { todos, tuser } from "./_db";

interface todo {
  _id?: any;
  title: string;
  description: string;
  done: boolean;
  deleted: boolean;
  archive: boolean;
}

export default async function GetTodos(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      await dbConnect();
      authentication(req, res, async () => {
        let email = req.headers.email;
        if (!email || email === undefined) {
          res.status(404).json({ error: "email not found in headers." });
          return;
        }
        if (email && Array.isArray(email)) {
          email = email[0];
        }
        let user = await tuser.findOne({ email: email });
        if (!user) {
          res.status(404).json({ error: "user not found" });
        } else {
          let allTodos = user.my_todos;
          const todoPromises = allTodos.map(async (each: any) => {
            var tempObj: todo = {
              title: "",
              description: "",
              done: false,
              deleted: false,
              archive: false,
            };
            var found = await todos.findById(each);
            if (found) {
              tempObj._id = found._id;
              tempObj.title = found.title;
              tempObj.description = found.description;
              tempObj.done = found.done;
              tempObj.deleted = found.deleted;
              tempObj.archive = found.archive;
              console.log(tempObj);
              return tempObj;
            }
          });
          const todosArray = await Promise.all(todoPromises);

          let todoFinal: todo[] = [];
          let doneTodos: todo[] = [];
          let deleted: todo[] = [];
          let archived: todo[] = [];

          todosArray.forEach((eachTodo: todo) => {
            if (eachTodo.deleted === true && eachTodo.archive === false) {
              deleted.push(eachTodo);
            }
            if (eachTodo.archive === true && eachTodo.deleted === false) {
              archived.push(eachTodo);
            }
            if (eachTodo.done === true && eachTodo.archive === false && eachTodo.deleted === false) {
              doneTodos.push(eachTodo);
            }
            if (
              eachTodo.done === false &&
              eachTodo.deleted === false &&
              eachTodo.archive === false
            ) {
              todoFinal.push(eachTodo);
            }
          });

          let result = { todoFinal, doneTodos, deleted, archived };
          res.status(200).send(result);
        }
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }else{
    res.status(400).json({error: "Invalid HTTP request"})
  }
}
