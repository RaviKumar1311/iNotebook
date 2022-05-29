import React, { useContext,useState } from 'react'
import noteContext from '../context/notes/noteContext'
import alertContext from '../context/components/alertContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const contextAlert = useContext(alertContext);
    const {addNote} = context;
    const {showAlert} = contextAlert; 
    const [note,setNote] = useState({title:"",description:"",tag:""})
    const [isExpanded,setIsExpanded] = useState(false)

    const handleClick = (e) =>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        showAlert("Added Successfully","success")
        setIsExpanded(false)
    }
    const handleChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <div className="container my-3 " >
        {/* <h2>Add a Note</h2> */}
        <form className="my-3 create-note" onSubmit={handleClick}>
          <div className="mb-3">
            {/* <label htmlFor="title" className="form-label">Title</label> */}
            {
               isExpanded && 

            <input type="text" className="form-control" id="title" aria-describedby="emailHelp" required minLength='5' value={note.title} placeholder='Title' name='title' onChange={handleChange}  autoComplete="off" autoFocus/>
            }
          </div>
          <div className="mb-3">
            {/* <label htmlFor="description" className="form-label">Description</label> */}
            <textarea type="text" className="form-control" id="description" minLength='5' required value={note.description} placeholder='Add a note...' name='description' onChange={handleChange} onClick={()=>setIsExpanded(true)} rows={isExpanded?'3':'1'}/>
          </div>
            {
               isExpanded &&
               <div>

          <div className="mb-3">
            {/* <label htmlFor="tag" className="form-label">Tag</label> */}
            <input type="text" className="form-control" id="tag"  value={note.tag} placeholder='Enter Tag' name='tag' onChange={handleChange}  autoComplete="off"/>
          </div>
         
          <input type="submit" value='Add'  className="btn add_note-button" />
           
               </div>
            }
        </form>
      </div>
    </div>
  )
}

export default AddNote
