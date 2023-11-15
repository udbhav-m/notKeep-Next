import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  done: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  archive: {
    type: Boolean,
    default: false,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  my_todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "todos" }],
});

export const tuser =
  mongoose.models.tuser || mongoose.model("tuser", userSchema);
export const todos =
  mongoose.models.todos || mongoose.model("todos", todoSchema);

const URL = process.env.DB_CONNECTION;

let alreadyConnected = false;

export default async function dbConnect() {
  if (alreadyConnected) {
    return "already connected";
  } else {
    if (URL || !(URL === undefined)) {
      await mongoose.connect(URL);
      return "connected to mongoose";
    } else {
      return "invalid URL";
    }
  }
}
