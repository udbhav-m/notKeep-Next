import axios from "axios";
import { SetStateAction } from "react";

export default async function getNotes(
  token: string,
  setError: { (value: SetStateAction<boolean>): void; (arg0: boolean): void },
  setMessage: { (value: SetStateAction<string>): void; (arg0: string): void }
) {
  try {
    const getAPI = await axios.get("/api/getTodos", {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
    console.log(getAPI);
    const getAPIData = getAPI.data;
    if (getAPIData.error && getAPIData.error != undefined) {
      throw new Error(getAPIData.error);
    }
    if (
      getAPIData.todosFinal ||
      getAPIData.doneTodos ||
      getAPIData.deleted ||
      getAPIData.archived
    ) {
      return getAPIData;
    }
  } catch (err: any) {
    setError(true);
    setMessage(err.message);
    setTimeout(() => {
      setError(false);
      setMessage("");
    }, 5000);
  }
}
