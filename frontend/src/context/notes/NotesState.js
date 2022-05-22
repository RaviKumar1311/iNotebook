import React, { useState } from "react";
import { deleteApi, getApi, postApi, putApi } from "../../utils/apiCalls";
import NoteContext from "./noteContext";

const NoteState = (props) =>{

    const notesInitial = []
    const [notes,setNotes] = useState(notesInitial)
    
    // Get all Notes
    const getNotes = async() =>{
      console.log("Getting all Notes...")
      const response = await getApi(`api/notes/fetchallnotes`);
      console.log(response)
      setNotes(response);
    }

    // Add Note
    const addNote = async(title,description,tag)=>{
      console.log("Adding a new Note")
      const response = await postApi(`api/notes/addnote`, {title,description,tag})
      console.log(response)
      setNotes(notes.concat(response))
    }

    // Delete Note
    const deleteNote = async(id) =>{
      console.log("Deleting Note with id",id)
      const response = await deleteApi(`api/notes/deletenote/${id}`);
      console.log(response)
      const newNotes = notes.filter(note=> note._id!==id)
      setNotes(newNotes)
    }

    // Edit Note 
    const editNote = async(id,title,description,tag) =>{
      console.log("Updating note with id",id)
      const response = await putApi(`api/notes/updatenote/${id}`,{title,description,tag})
      console.log(response)

      // --------------------------------- updating list by hit api again -----------------------------------
      // if(response._id){
      //   getNotes();
      // }
      // -------------------------------------------------------------------------------------------------------

      let newNotes = JSON.parse(JSON.stringify(notes))
      for(let index=0; index<newNotes.length; index++){
        const element=newNotes[index];
        if(element._id===id){
          element.title=title;
          element.description=description;
          element.tag=tag;
          break;
        }
      }
      setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}   

export default NoteState;