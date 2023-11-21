import { useTheme } from "next-themes";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  descriptionState,
  errorState,
  messageState,
  overlayProps,
  overlayState,
  titleState,
} from "../api/_atoms";
import axios from "axios";
import { useState } from "react";

export default function Overlay(props: any) {
  const { theme } = useTheme();
  const [Overlay, setOverlay] = useRecoilState(overlayState);
  const sentProps = useRecoilValue(overlayProps);
  const { id, title, description, token } = sentProps;
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const setError = useSetRecoilState(errorState);
  const setMessage = useSetRecoilState(messageState);
  const [done, setDone] = useState(false);

  async function UpdateTodo() {
    try {
      var titleUpdate = "";
      var descriptionUpdate = "";
      if (newTitle.length >= 1 && newDescription.length >= 1) {
        titleUpdate = newTitle;
        descriptionUpdate = newDescription;
        console.log(1);
      }
      if (newTitle.length >= 1 && !(newDescription.length >= 1)) {
        titleUpdate = newTitle;
        descriptionUpdate = description;
        console.log(2);
      }
      if (!(newTitle.length >= 1) && newDescription.length >= 1) {
        titleUpdate = title;
        descriptionUpdate = newDescription;
        console.log(3);
      }
      if (!(newTitle.length >= 1) && !(newDescription.length >= 1)) {
        titleUpdate = title;
        descriptionUpdate = description;
        console.log(4);
      }

      const updateAPI = await axios.put(
        `/api/update/${id}`,
        {
          title: titleUpdate,
          description: descriptionUpdate,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      const updateData = updateAPI.data;
      if (updateData.error && updateData.error != undefined) {
        throw new Error(updateData.error);
      }
      if (updateData.message && updateData.message != undefined) {
        props.fetchNotes();
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

  if (Overlay) {
    return (
      <div className="z-50 fixed w-full h-screen bg-black bg-opacity-80 flex items-center">
        <div className={` flex flex-col justify-center w-full items-center`}>
          <div
            className={`w-4/5 sm:w-3/5 p-1 shadow-md rounded-lg  ${
              theme === "dark"
                ? "border border-neutral-800 bg-color"
                : theme === "light"
                ? "border bg-white"
                : "border-none"
            } `}
          >
            <input
              onChange={(e) => {
                setDone(true);
                setNewTitle(e.target.value);
              }}
              className={`w-full h-12 p-6 focus:outline-none ${
                theme === "dark"
                  ? "bg-color"
                  : theme === "light"
                  ? ""
                  : "bg-transparent"
              }`}
              type="text"
              value={done && newTitle.length >= 1 ? newTitle : title}
            />
            <textarea
              onChange={(e) => {
                setDone(true);
                setNewDescription(e.target.value);
              }}
              className={`w-full h-12 p-6 resize-none overflow-hidden focus:outline-none ${
                theme === "dark" ? "bg-color" : ""
              }`}
              value={
                done && newDescription.length >= 1
                  ? newDescription
                  : description
              }
            />
            <div
              className={`flex justify-end gap-2 ${
                theme === "dark" ? "bg-color" : "bg-white"
              }`}
            >
              <button
                onClick={() => {
                  UpdateTodo();
                }}
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
                  setNewTitle("");
                  setNewDescription("");
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
