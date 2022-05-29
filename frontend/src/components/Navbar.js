import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {

  let location = useLocation();
    
  return (
    <div>
  <nav className="navbar navbar-expand-lg navbar-dark bg-warning ps-3 py-2">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/"><i className="fa-regular fa-clipboard"/> iNotebook</Link>
    <button className="navbar-toggler" type="button" >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" >
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
        </li>
      </ul>
      {
        !localStorage.getItem('token')?  
      <div className="d-flex">
        <Link className="btn btn-sm navbar-button mx-1" to='/login' role='button'>Login</Link>
        <Link className="btn btn-sm navbar-button mx-1" to='/signup' role='button'>SignUp</Link>
      </div>
      :
      <div className='d-flex'>
        <a  data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
          <img src='./profile.png' className='me-3 align-middle' style={{height:"40px",width:"auto"}} alt='Profile-avatar'/>
        </a>
      </div>
      }
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
