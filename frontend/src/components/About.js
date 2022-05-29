import React from 'react'
// import NoteContext from '../context/notes/noteContext'


const About = () => {
  // const a  = useContext(NoteContext) 
  return (

    <div >
    <section className='about-section'>

          <h1 className="display-4 text-center mt-3 " style={{color:"#f5ba13"}}>iNotebook</h1>
    </section>
    
      {/* This is About {a.name} */}
      <div className="jumbotron jumbotron-fluid about-card">
        <div className="container">
          <ul>
          <li className="lead">A Notebook that keeps notes save on the server.</li>
          <li className="lead">iNotebook is the best place to note down quick thoughts or to save longer notes.</li>
          <li className="lead">Secure notes containing sensitive or personal data with a password.</li>
          <li className="lead">It gives you a quick and simple notepad editing experience.</li>
          <li className="lead">It makes to take a note easier than any other notepad and memo apps.</li>
          <li className="lead">Simple interface that most of the users find easy to use.</li>
          <li className="lead">Latest Security updates.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default About
