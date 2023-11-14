import Appbar from "./components/appbar";
import Sidebar from "./components/sidebar";
import TakeNote from "./components/takeNote";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import Note from "./components/Note";
import Overlay from "./components/Overlay";
import { useToast } from "@/components/ui/use-toast";
import getNotes from "./functionality/GetNotes";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  archiveState,
  errorState,
  messageState,
  normalNotes,
  trashState,
} from "./api/_atoms";

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

  const note = useRecoilValue(normalNotes);
  const archive = useRecoilValue(archiveState);
  const trash = useRecoilValue(trashState);

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
        <Overlay />
        <Appbar />
        <div className="flex gap-10">
          <Sidebar />
          <div className="flex flex-col w-full mt-6 justify-center gap-10 ">
            <TakeNote
              token={token}
              setError={setError}
              setMessage={setMessage}
              fetchNotes={fetchNotes}
            />
            <div className={` flex flex-col gap-3 ${!note ? "hidden" : ""}`}>
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
                          setError={setError}
                          setMessage={setMessage}
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
                !archive ? "hidden" : ""
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
              className={`flex flex-wrap gap-2 mr-1 ${!trash ? "hidden" : ""}`}
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
