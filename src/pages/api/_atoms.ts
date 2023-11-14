import { atom } from "recoil";

export default interface note {
  title: string;
  description: string;
  done: boolean;
  deleted: boolean;
  archive: boolean;
  _id: any;
}

interface allNotes {
  todoFinal: note[];
  doneTodos: note[];
  deleted: note[];
  archived: note[];
}

//************** Sidebar **************

export const sidebarState = atom({
  key: "sidebar",
  default: false,
});

export const archiveState = atom({
  key: "archiveState",
  default: false,
});

export const trashState = atom({
  key: "trashState",
  default: false,
});

export const normalNotes = atom({
  key: "normalNotes",
  default: true,
});

//************** Landing **************
export const usernameState = atom({
  key: "usernameState",
  default: "",
});

export const emailState = atom({
  key: "emailState",
  default: "",
});

export const passwordState = atom({
  key: "passwordState",
  default: "",
});

//************** Global **************
export const errorState = atom({
  key: "errorState",
  default: false,
});

export const messageState = atom({
  key: "messageState",
  default: "",
});

export const successState = atom({
  key: "successState",
  default: false,
});

export const userState = atom({
  key: "userState",
  default: "",
});

// ************** Home - getters **************

export const overlayState = atom({
  key: "overlayState",
  default: false,
});

export const overlayProps = atom({
  key: "overlayProps",
  default: {
    id: "",
    title: "",
    description: "",
    done: false,
  },
});

// ************** Home - Inputs **************

export const titleState = atom({
  key: "titleState",
  default: "",
});

export const descriptionState = atom({
  key: "descriptionState",
  default: "",
});
