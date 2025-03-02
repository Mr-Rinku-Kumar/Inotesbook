import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/notecontext';
import '../styles/Addnote.css';

const AddNote = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();

    if (note.title.length < 5 || note.description.length < 5) {
      if (props.showAlert) props.showAlert("Title and description must be at least 5 characters long!", "danger");
      return;
    }

    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });

    if (props.showAlert) props.showAlert("Note added successfully!", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="my-3">
      <h2>Add a Note</h2>
      <form className="my-3 form">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
          disabled={note.title.length < 5 || note.description.length < 5}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
