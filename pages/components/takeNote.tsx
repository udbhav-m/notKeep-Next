import { useTheme } from "next-themes";
import { useState } from "react";
import {
  SetterOrUpdater,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import {
  descriptionState,
  errorState,
  messageState,
  normalNotes,
  titleState,
} from "../api/_atoms";
import axios from "axios";
// import saveNotes from "../functionality/SaveNotes";

export default function TakeNote(props: any) {
  const note = useRecoilValue(normalNotes);
  const { theme } = useTheme();
  const [hide, setHide] = useState(true);
  const [close, setClose] = useState(false);
  const [title, setTitle] = useRecoilState(titleState);
  const [description, setDescription] = useRecoilState(descriptionState);
  const { token, fetchNotes } = props;
  const setError = useSetRecoilState(errorState);
  const setMessage = useSetRecoilState(messageState);

  const handleClose = () => {
    if (hide) {
      setHide(false);
    }

    if (!close) {
      setClose(true);
    } else {
      setHide(true);
      setClose(false);
    }
  };

  const handleSave = () => {
    saveNotes(title, description, token, fetchNotes, setError, setMessage);
    setTitle("");
    setDescription("");
  };

  return (
    <div
      className={` ${
        !note ? "hidden" : ""
      } flex flex-col justify-center w-full items-center`}
    >
      <div
        className={`w-3/5 p-1 shadow-md rounded-lg  ${
          theme === "dark"
            ? "border border-neutral-800"
            : theme === "light"
            ? "border"
            : "border-none"
        } `}
      >
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          onClick={() => {
            handleClose();
          }}
          className={`w-full h-12 p-6 focus:outline-none ${
            theme === "dark"
              ? "bg-color"
              : theme === "light"
              ? ""
              : "bg-transparent"
          }`}
          type="text"
          placeholder="Take a note.."
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className={`w-full h-12 p-6 resize-none overflow-hidden focus:outline-none ${
            theme === "dark" ? "bg-color" : ""
          } ${hide ? "hidden" : ""}`}
          placeholder="Because we know your memory is so weak, it can't even lift a thought."
        />
        <div className={`flex justify-end gap-2 ${!close ? "hidden" : ""}`}>
          <button
            onClick={() => handleSave()}
            className={`rounded p-4 pt-2 pb-2 ${
              theme === "dark"
                ? "hover:bg-zinc-900 "
                : theme === "light"
                ? "hover:bg-slate-100"
                : ""
            } `}
          >
            Save
          </button>
          <button
            onClick={() => {
              handleClose();
            }}
            className={`rounded p-4 pt-2 pb-2 ${
              theme === "dark"
                ? "hover:bg-zinc-900 "
                : theme === "light"
                ? "hover:bg-slate-100"
                : ""
            } `}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

async function saveNotes(
  title: string,
  description: string,
  token: any,
  fetchNotes: () => void,
  setError: SetterOrUpdater<boolean>,
  setMessage: SetterOrUpdater<string>
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
