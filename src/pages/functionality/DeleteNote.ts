import axios from "axios";

export default async function deleteTodo(
  id: string,
  token: any,
  fetchNotes: () => void,
  setError: (arg0: boolean) => void,
  setMessage: (arg0: string) => void
) {
  try {
    const deleteAPI = await axios.put(
      `/api/delete/${id}`,
      { deleted: true },
      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );
    const deleteData = deleteAPI.data;
    console.log(deleteData);
    if (deleteData.error && deleteData.error != undefined) {
      throw new Error(deleteData.error);
    }
    if (deleteData.message) {
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

export async function undoDelete(
  id: string,
  token: any,
  fetchNotes: () => void,
  setError: (arg0: boolean) => void,
  setMessage: (arg0: string) => void
) {
  try {
    const deleteAPI = await axios.put(
      `/api/undo/delete/${id}`,
      { deleted: false },
      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );
    const deleteData = deleteAPI.data;
    console.log(deleteData);
    if (deleteData.error && deleteData.error != undefined) {
      throw new Error(deleteData.error);
    }
    if (deleteData.message) {
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
