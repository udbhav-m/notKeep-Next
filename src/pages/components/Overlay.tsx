import { useTheme } from "next-themes";
import { useRecoilState, useRecoilValue } from "recoil";
import { overlayProps, overlayState } from "../api/_atoms";

export default function Overlay() {
  const { theme } = useTheme();
  const [Overlay, setOverlay] = useRecoilState(overlayState);
  const props = useRecoilValue(overlayProps);
  const { id, title, description, done } = props;

  if (Overlay) {
    return (
      <div className="z-50 fixed w-full h-screen bg-black bg-opacity-80 flex items-center">
        <div className={` flex flex-col justify-center w-full items-center`}>
          <div
            className={`w-3/5 p-1 shadow-md rounded-lg  ${
              theme === "dark"
                ? "border border-neutral-800 bg-color"
                : theme === "light"
                ? "border bg-white"
                : "border-none"
            } `}
          >
            <input
              onClick={() => {}}
              className={`w-full h-12 p-6 focus:outline-none ${
                theme === "dark"
                  ? "bg-color"
                  : theme === "light"
                  ? ""
                  : "bg-transparent"
              }`}
              type="text"
              value={title}
            />
            <textarea
              className={`w-full h-12 p-6 resize-none overflow-hidden focus:outline-none ${
                theme === "dark" ? "bg-color" : ""
              }`}
              value={description}
            />
            <div
              className={`flex justify-end gap-2 ${
                theme === "dark" ? "bg-color" : "bg-white"
              }`}
            >
              <button
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
              <button
                className={`rounded p-4 pt-2 pb-2 ${
                  theme === "dark"
                    ? "hover:bg-zinc-900 "
                    : theme === "light"
                    ? "hover:bg-slate-100"
                    : ""
                } `}
              >
                Update
              </button>
              <button
                onClick={() => {
                  setOverlay(false);
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
      </div>
    );
  }
}
