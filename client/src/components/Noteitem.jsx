import React,{useContext} from 'react'
import NoteContext from '../context/notes/notecontext'
import '../styles/Notes.css'; // Update the import path to reflect the new folder structure


const Noteitem = (props) => {
    const context = useContext(NoteContext)
    const { deleteNote } = context;
    const { note,updateNote } = props;
    return (
        <div className="col-md-3.5 my-3">
            <div className="card">
                <div className="card-body note-card">
                    <h5 className="card-title note-title">{note.title}</h5>
                    <p className="card-text note-description"> {note.description}</p>
                    <i className="fa-solid fa-trash mx-3 delete-button" onClick={()=>{deleteNote(note._id);props.showAlert("DELETED THE NOTE")}}></i>
                    <i className="fa-solid fa-pen-to-square mx-3 edit-button" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem