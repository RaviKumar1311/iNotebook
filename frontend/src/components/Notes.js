import React, { useContext,useEffect, useRef,useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from '../context/notes/noteContext'
import alertContext from "../context/components/alertContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Notes = () => {
const context = useContext(noteContext);
const contextAlert = useContext(alertContext);
const {notes,getNotes,editNote,fetchUserInfo} = context;
const {showAlert}= contextAlert;
const ref=useRef(null)
const refClose=useRef(null)
const [note,setNote] = useState({eid:"",etitle:"",edescription:"",etag:""})
let history=useNavigate();

useEffect(()=>{
  if(localStorage.getItem('token')){
    fetchUserInfo();
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
  showAlert("Updated Successfully","success");
}
const handleChange = (e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}
  return (
    <div>
    <AddNote showAlert={showAlert}/> 
      
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
        <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered ">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
    
              <div className="container">
                <form className="my-3 edit-note">
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" value={note.etitle} name='etitle' onChange={handleChange} autoComplete="off"/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <textarea type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} rows='2' onChange={handleChange}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={handleChange} autoComplete="off"/>
                  </div>
                
                </form>
              </div>
          
              </div>
              <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" disabled={note.etitle.length<5||note.edescription.length<5} className="btn add_note-button" onClick={handleSubmit} >Save changes</button>
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
      <div className=" my-3">

        <h1 className='text-center text-decoration-underline mt-5' style={{color:"#ccc"}}>Your Notes</h1>
        <div className='text-center text-decoration-underline mt-5'>
        {notes.length === 0 && <h6>Your saved notes will shown up here...</h6>}
        </div>
        <div className="row">

        {
          notes.map((note,index)=>{
            return <NoteItem key={index} updateNote={updateNote} showAlert={showAlert} note={note}/>
          })
        }
        </div>
      </div>
    </div>
  )
}

export default Notes
