import axios from "axios";

export default async function archiveTodo(
  id: string,
  token: any,
  fetchNotes: () => void,
  setError: (arg0: boolean) => void,
  setMessage: (arg0: string) => void
) {
  try {
    const archiveAPI = await axios.put(
      `/api/archive/${id}`,
      { archive: true },
      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );
    const archiveData = archiveAPI.data;
    console.log(archiveData);
    if (archiveData.error && archiveData.error != undefined) {
      throw new Error(archiveData.error);
    }
    if (archiveData.message) {
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

export async function undoArchive(
  id: string,
  token: any,
  fetchNotes: () => void,
  setError: (arg0: boolean) => void,
  setMessage: (arg0: string) => void
) {
  try {
    const archiveAPI = await axios.put(
      `/api/undo/archive/${id}`,
      { archive: false },
      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );
    const archiveData = archiveAPI.data;
    console.log(archiveData);
    if (archiveData.error && archiveData.error != undefined) {
      throw new Error(archiveData.error);
    }
    if (archiveData.message) {
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
