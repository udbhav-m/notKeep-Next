import { useTheme } from "next-themes";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  archiveState,
  overlayProps,
  overlayState,
  trashState,
} from "../api/_atoms";
import deleteTodo, { undoDelete } from "../functionality/DeleteNote";
import archiveTodo, { undoArchive } from "../functionality/ArchiveNote";
import doneTodo, { undoDone } from "../functionality/DoneNotes";

export default function Note(props: any) {
  const { theme } = useTheme();
  const setOverlay = useSetRecoilState(overlayState);
  const setProps = useSetRecoilState(overlayProps);
  const archive = useRecoilValue(archiveState);
  const trash = useRecoilValue(trashState);
  const {
    id,
    title,
    description,
    done,
    token,
    fetchNotes,
    setError,
    setMessage,
  } = props;

  const handleDelete = () => {
    deleteTodo(id, token, fetchNotes, setError, setMessage);
  };

  const handleArchive = () => {
    archiveTodo(id, token, fetchNotes, setError, setMessage);
  };

  const undoDel = () => {
    undoDelete(id, token, fetchNotes, setError, setMessage);
  };

  const undoArch = () => {
    undoArchive(id, token, fetchNotes, setError, setMessage);
  };

  const handleDone = () => {
    doneTodo(id, token, fetchNotes, setError, setMessage);
  };

  const undoDo = () => {
    undoDone(id, token, fetchNotes, setError, setMessage);
  };

  return (
    <div
      className={`flex flex-col rounded-lg gap-3 w-60 group ${
        theme === "dark"
          ? "border border-neutral-800"
          : theme === "light"
          ? "border"
          : "border-none"
      } `}
    >
      <div
        onClick={() => {
          setOverlay(true);
          setProps({ id, title, description, done });
        }}
        className="flex flex-col break-words overflow-hidden"
      >
        <div className={`p-2 pl-3 ${done ? "line-through opacity-50" : ""}`}>
          {title}
        </div>
        <div
          className={`p-2 pl-3 pb-0 ${done ? "line-through opacity-50" : ""}`}
        >
          {description}
        </div>
      </div>
      <div className="flex pl-2 pb-1 gap-3 opacity-0 opacity-transition duration-200 group-hover:opacity-100">
        <button
          onClick={() => {
            if (done) {
              undoDo();
            } else {
              handleDone();
            }
          }}
          className={`p-2 rounded-full bg-opacity-95 hover:bg-zinc-800`}
        >
          <svg
            fill="#6B6B6B"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path d="M 12 1 C 5.9375 1 1 5.9375 1 12 C 1 18.0625 5.9375 23 12 23 C 18.0625 23 23 18.0625 23 12 C 23 5.9375 18.0625 1 12 1 Z M 12 3 C 16.980469 3 21 7.019531 21 12 C 21 16.980469 16.980469 21 12 21 C 7.019531 21 3 16.980469 3 12 C 3 7.019531 7.019531 3 12 3 Z M 17.40625 8.1875 L 11 14.5625 L 7.71875 11.28125 L 6.28125 12.71875 L 10.28125 16.71875 L 11 17.40625 L 11.71875 16.71875 L 18.8125 9.59375 Z"></path>
          </svg>
        </button>
        <button
          onClick={() => {
            if (archive) {
              undoArch();
            } else {
              handleArchive();
            }
          }}
          className={`p-2 rounded-full bg-opacity-95 hover:bg-zinc-800`}
        >
          <svg
            fill="#6B6B6B"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm11-5.5l-4 4-4-4 1.41-1.41L11 13.67V10h2v3.67l1.59-1.59L16 13.5z"></path>
          </svg>
        </button>
        <button
          onClick={() => {
            if (trash) {
              undoDel();
            } else {
              handleDelete();
            }
          }}
          className={`p-2  rounded-full bg-opacity-95 hover:bg-zinc-800`}
        >
          <svg
            fill="#6B6B6B"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path>
            <path d="M9 8h2v9H9zm4 0h2v9h-2z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
