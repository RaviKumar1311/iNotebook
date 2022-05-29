import React, { useState } from "react";
import { deleteApi, getApi, postApi, putApi } from "../../utils/apiCalls";
import NoteContext from "./noteContext";

const NoteState = (props) =>{

    const notesInitial = []
    const [notes,setNotes] = useState(notesInitial)
    const [userData,setUserData] = useState()
    
    // Get all Notes
    const getNotes = async() =>{
      const response = await getApi(`api/notes/fetchallnotes`);
      console.log("Getting all Notes...", response)
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
      // ------------------------------------------------------------------------------------------------------

      // --------------------------------- updating list without hit api again --------------------------------
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

    const fetchUserInfo=async()=>{
      const response = await postApi(`api/auth/getuser`);
      const data=response?.user;
      if(data){
        console.log("Getting userData...",data)
        setUserData(data)
      }
  }

    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes,fetchUserInfo,userData}}>
            {props.children}
        </NoteContext.Provider>
    )
}   

export default NoteState;