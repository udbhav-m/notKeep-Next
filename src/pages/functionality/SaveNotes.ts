import axios from "axios";

export default async function saveNotes(
  title: string,
  description: string,
  token: any,
  fetchNotes: () => void,
  setError: (arg0: boolean) => void,
  setMessage: (arg0: string) => void
) {
  try {
    const saveAPI = await axios.post(
      "/api/createTodos",
      { title, description },
      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );
    const saveData = saveAPI.data;
    if (saveData.error && saveData.error != undefined) {
      throw new Error(saveData.error);
    }
    fetchNotes();
  } catch (err: any) {
    setError(true);
    setMessage(err.message);
    setTimeout(() => {
      setError(false);
      setMessage("");
    }, 5000);
  }
}
