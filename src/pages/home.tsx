import Appbar from "./components/appbar";
import Sidebar from "./components/sidebar";
import TakeNote from "./components/takeNote";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import Note from "./components/Note";
import Overlay from "./components/Overlay";
import { useToast } from "@/components/ui/use-toast";
// import getNotes from "./functionality/GetNotes";
import { SetterOrUpdater } from "recoil";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  archiveState,
  errorState,
  messageState,
  normalNotes,
  queryState,
  trashState,
} from "./api/_atoms";
import axios from "axios";

interface note {
  title: string;
  description: string;
  done: boolean;
  deleted: boolean;
  archive: boolean;
  _id: any;
}

interface notes {
  todoFinal: [];
  doneTodos: [];
  deleted: [];
  archived: [];
}

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [done, setDone] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [archived, setArchived] = useState([]);
  const [error, setError] = useRecoilState(errorState);
  const [message, setMessage] = useRecoilState(messageState);
  const { toast } = useToast();
  const cookies = parseCookies();
  const token = cookies.token;
  const query = useRecoilValue(queryState);

  const note = useRecoilValue(normalNotes);
  const archive = useRecoilValue(archiveState);
  const trash = useRecoilValue(trashState);
  var searchItems: note[] = [];

  async function fetchNotes() {
    const data = await getNotes(token, setError, setMessage);
    if (data.todoFinal) {
      setNotes(data.todoFinal);
    }
    if (data.doneTodos) {
      setDone(data.doneTodos);
    }
    if (data.todoFinal) {
      setDeleted(data.deleted);
    }
    if (data.todoFinal) {
      setArchived(data.archived);
    }
  }

  if (query) {
    if (note) {
      var notesSearch = notes.filter((item: note) => {
        if (
          item.title.toLowerCase().includes(query.toLocaleLowerCase()) ||
          item.description.toLowerCase().includes(query.toLocaleLowerCase())
        ) {
          return item;
        }
      });
      var doneSearch = done.filter((item: note) => {
        if (
          item.title.toLowerCase().includes(query.toLocaleLowerCase()) ||
          item.description.toLowerCase().includes(query.toLocaleLowerCase())
        ) {
          return item;
        }
      });
      searchItems = notesSearch.concat(doneSearch);
    }
    if (archive) {
      searchItems = archived.filter((item: note) => {
        if (
          item.title.toLowerCase().includes(query.toLocaleLowerCase()) ||
          item.description.toLowerCase().includes(query.toLocaleLowerCase())
        ) {
          return item;
        }
      });
    }
    if (trash) {
      searchItems = deleted.filter((item: note) => {
        if (
          item.title.toLowerCase().includes(query.toLocaleLowerCase()) ||
          item.description.toLowerCase().includes(query.toLocaleLowerCase())
        ) {
          return item;
        }
      });
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  if (error) {
    toast({
      title: "Message",
      description: message,
    });
  }

  return (
    <>
      <div>
        <Overlay fetchNotes={fetchNotes} />
        <Appbar />
        <div className="flex gap-10">
          <Sidebar />
          <div className="flex flex-col w-full mt-6 justify-center gap-10 ">
            <TakeNote token={token} fetchNotes={fetchNotes} />
            <div
              className={` flex flex-wrap gap-2 mr-1 ${!query ? "hidden" : ""}`}
            >
              {query
                ? searchItems.map((eachNote: note) => {
                    return (
                      <Note
                        key={eachNote._id.toString()}
                        id={eachNote._id.toString()}
                        done={eachNote.done}
                        title={eachNote.title}
                        description={eachNote.description}
                        token={token}
                        fetchNotes={fetchNotes}
                      />
                    );
                  })
                : "no search items"}
            </div>
            <div
              className={` flex flex-col gap-3 ${
                !note || query ? "hidden" : ""
              }`}
            >
              <div className="flex flex-wrap gap-2 mr-1">
                {notes
                  ? notes.map((eachNote: note) => {
                      return (
                        <Note
                          key={eachNote._id.toString()}
                          id={eachNote._id.toString()}
                          done={eachNote.done}
                          title={eachNote.title}
                          description={eachNote.description}
                          token={token}
                          fetchNotes={fetchNotes}
                        />
                      );
                    })
                  : "You have no notes. That great memory huh?"}
              </div>
              <div className="flex flex-wrap w-full gap-2 ">
                {done
                  ? done.map((eachNote: note) => {
                      return (
                        <Note
                          key={eachNote._id.toString()}
                          id={eachNote._id.toString()}
                          done={eachNote.done}
                          title={eachNote.title}
                          description={eachNote.description}
                          token={token}
                          setError={setError}
                          setMessage={setMessage}
                          fetchNotes={fetchNotes}
                        />
                      );
                    })
                  : ""}
              </div>
            </div>

            <div
              className={`flex flex-wrap gap-2 mr-1 ${
                !archive || query ? "hidden" : ""
              }`}
            >
              {archived
                ? archived.map((eachNote: note) => {
                    return (
                      <Note
                        key={eachNote._id.toString()}
                        id={eachNote._id.toString()}
                        done={eachNote.done}
                        title={eachNote.title}
                        description={eachNote.description}
                        token={token}
                        setError={setError}
                        setMessage={setMessage}
                        fetchNotes={fetchNotes}
                      />
                    );
                  })
                : "You have no notes."}
            </div>

            <div
              className={`flex flex-wrap gap-2 mr-1 ${
                !trash || query ? "hidden" : ""
              }`}
            >
              {deleted
                ? deleted.map((eachNote: note) => {
                    return (
                      <Note
                        key={eachNote._id.toString()}
                        id={eachNote._id.toString()}
                        done={eachNote.done}
                        title={eachNote.title}
                        description={eachNote.description}
                        token={token}
                        setError={setError}
                        setMessage={setMessage}
                        fetchNotes={fetchNotes}
                      />
                    );
                  })
                : "You have no notes. That great memory huh?"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

async function getNotes(
  token: string,
  setError: SetterOrUpdater<boolean>,
  setMessage: SetterOrUpdater<string>
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
