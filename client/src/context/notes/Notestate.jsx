import NoteContext from "./notecontext";
import { useState } from "react";

const NoteState = (props) => {
  const initialnotes = []

  const [notes, setNotes] = useState(initialnotes)


  //Get all notes
  const getNotes = async () => {
    //  Api call
    const responce = await fetch(`http://localhost:5000/api/notes/fetchallnotes/`, {
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
    });
    const json = await responce.json()
    setNotes(json)

  }
  //Add a note
  const addNote = async (title, description, tag) => {
    // Api call
    const responce = await fetch(`http://localhost:5000/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    });

    const note = await responce.json();
    setNotes(notes.concat(note));

  }

  //Delete a note
  const deleteNote = async (id) => {
    // Api call
    const responce = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
    });
    const json = await responce.json();
    console.log(json)
    
    setNotes(notes.filter(note => note._id !== id));
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const responce = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await responce.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes));
    //logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break;
      }
    }
    setNotes(newNotes)
  }


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;