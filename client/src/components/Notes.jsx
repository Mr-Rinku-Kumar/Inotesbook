import { useContext, useEffect, useRef, useState, useCallback } from "react";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import NoteContext from "../context/notes/notecontext";
import { useNavigate } from "react-router-dom";
import "../styles/Notes.css"; 


const Notes = (props) => {
  const { notes, getNotes, editNote } = useContext(NoteContext);
  const navigate = useNavigate();
  
  const [user, setUser] = useState({ name: "" });
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      await getNotes();
      await fetchUserDetails();
    };

    fetchData();
    // eslint-disable-next-line
  }, [navigate]);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/getuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      const data = await response.json();
      setUser({ name: data.name || "User" });
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const ref = useRef(null);
  const closeRef = useRef(null);

  const updateNote = useCallback((currentNote) => {
    ref.current.click();
    setNote({ 
      id: currentNote._id, 
      etitle: currentNote.title, 
      edescription: currentNote.description, 
      etag: currentNote.tag 
    });
  }, []);

  const handleClick = async () => {
    await editNote(note.id, note.etitle, note.edescription, note.etag);
    closeRef.current.click();
    props.showAlert("Note Updated Successfully! 🎉");
  };

  const onChange = (e) => setNote({ ...note, [e.target.name]: e.target.value });

  return (
    <>
      {/* User Profile Section */}
      <div className="user-profile">
        <h4 className="welcome">🎉---WELCOME---🎉</h4>
        <h3>@{user.name}</h3>
      </div>

      <AddNote showAlert={props.showAlert} />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      {/* Edit Note Modal */}
      <div className="modal fade form" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button onClick={handleClick} type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes List */}
      <div className="row my-3 notes-container">
        <h2>Your Notes</h2>
        {notes.length === 0 ? (
          <h4 className="text-muted mx-3">No Notes To Display</h4>
        ) : (
          notes.map((note, index) => (
            <Noteitem className="note-card" key={note._id || index} updateNote={updateNote} showAlert={props.showAlert} note={note} />
          ))
        )}
      </div>
    </>
  );
};

export default Notes;
