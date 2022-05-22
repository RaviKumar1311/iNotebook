import React from 'react'
// import NoteContext from '../context/notes/noteContext'


const About = () => {
  // const a  = useContext(NoteContext)
  return (
    <div>
      {/* This is About {a.name} */}
      <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h1 class="display-4">About iNotebook</h1>
          <p class="lead">A Notebook that keeps notes save on the server.</p>
        </div>
      </div>
    </div>
  )
}

export default About
