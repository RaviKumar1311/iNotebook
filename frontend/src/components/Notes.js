import React, { useContext,useEffect, useRef,useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from '../context/notes/noteContext'
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Notes = (props) => {
const context = useContext(noteContext);
const {notes,getNotes,editNote} = context;
const ref=useRef(null)
const refClose=useRef(null)
const [note,setNote] = useState({eid:"",etitle:"",edescription:"",etag:""})
let history=useNavigate();

useEffect(()=>{
  if(localStorage.getItem('token')){
    getNotes()
  }else{
    history('/login');
  }
  // eslint-disable-next-line
},[])

const updateNote = (currentNote) =>{
  ref.current.click()
  setNote({eid:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
}
const handleSubmit = (e) =>{
  editNote(note.eid,note.etitle,note.edescription,note.etag)
  refClose.current.click()
  props.showAlert("Updated Successfully","success");
}
const handleChange = (e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}
  return (
    <div>
    <AddNote showAlert={props.showAlert}/> 
      
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
    
              <div className="container">
                <form className="my-3">
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" value={note.etitle} name='etitle' onChange={handleChange}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <textarea type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} rows='2' onChange={handleChange}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={handleChange}/>
                  </div>
                
                </form>
              </div>
          
              </div>
              <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" disabled={note.etitle.length<5||note.edescription.length<5} className="btn btn-dark" onClick={handleSubmit} >Save changes</button>
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
      <div className="container row my-3">

        <h2>Your Notes</h2>
        <div className="container mx-2">
        {notes.length === 0 && <h6>No Notes to Display</h6>}
        </div>
        {
          notes.map((note,index)=>{
            return <NoteItem key={index} updateNote={updateNote} showAlert={props.showAlert} note={note}/>
          })
        }
      </div>
    </div>
  )
}

export default Notes
