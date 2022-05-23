import React,{useContext} from 'react'
import alertContext from '../context/components/alertContext'
import { Link, useLocation,useNavigate } from 'react-router-dom'

const Navbar = () => {
  const context = useContext(alertContext);
  const {showAlert} = context;
  let location = useLocation();
  let history=useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem('token');
    showAlert("Logged Out Successfully","success")
    history('/login')
  }
  
  return (
    <div>
  <nav className="navbar navbar-expand-lg navbar-dark bg-warning ps-3">
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
        <Link className="btn btn-sm btn-light mx-1" to='/login' role='button'>Login</Link>
        <Link className="btn btn-sm btn-light mx-1" to='/signup' role='button'>SignUp</Link>
      </div>
      :
      <button className='btn btn-sm btn-light mx-1' onClick={handleLogout}>Logout</button>
      }
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
