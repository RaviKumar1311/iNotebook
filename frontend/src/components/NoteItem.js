import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'
import alertContext from '../context/components/alertContext';

const NoteItem = (props) => {
  const {note,updateNote} = props;
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const contextAlert = useContext(alertContext);
  const {showAlert} = contextAlert;
  return (
    <div className='col-md-3'>
      <div className="card my-3"  >
  
        <div className="card-body">
        <div className='d-flex  justify-content-between'>

            <h5 className="card-title">{note.title}</h5>
            <div>
            <i className="fa-regular fa-trash-can mx-2" onClick={()=>{deleteNote(note._id);
              showAlert("Deleted Successfully","success");
            }}></i>
            <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
            </div>
        </div>
            <p className="card-text">{note.description}</p>
        
        </div>
        </div>
    </div>
  )
}

export default NoteItem
