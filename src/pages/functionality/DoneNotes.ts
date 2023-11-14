import axios from "axios";

export default async function doneTodo(
  id: string,
  token: any,
  fetchNotes: () => void,
  setError: (arg0: boolean) => void,
  setMessage: (arg0: string) => void
) {
  try {
    const doneAPI = await axios.put(
      `/api/done/${id}`,
      { done: true },
      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );
    const doneData = doneAPI.data;
    console.log(doneData);
    if (doneData.error && doneData.error != undefined) {
      throw new Error(doneData.error);
    }
    if (doneData.message) {
      fetchNotes();
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

export async function undoDone(
  id: string,
  token: any,
  fetchNotes: () => void,
  setError: (arg0: boolean) => void,
  setMessage: (arg0: string) => void
) {
  try {
    const doneAPI = await axios.put(
      `/api/undo/done/${id}`,
      { done: false },
      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );
    const doneData = doneAPI.data;
    console.log(doneData);
    if (doneData.error && doneData.error != undefined) {
      throw new Error(doneData.error);
    }
    if (doneData.message) {
      fetchNotes();
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
