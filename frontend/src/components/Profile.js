import React,{useContext,useState,useEffect} from 'react'
import alertContext from '../context/components/alertContext'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext'
import { putApi } from '../utils/apiCalls'

const Profile = () => {

  const context = useContext(alertContext);
  const {showAlert} = context;
  const contextNotes = useContext(noteContext);
  const {userData,fetchUserInfo} = contextNotes;

  const [isEditing,setIsEditing] = useState(false)
  const [userName,setUserName] = useState("")

  useEffect(()=>{
    setUserName(userData?.name)
  },[userData])

  let history=useNavigate()
  const handleLogout=()=>{
    // document.getElementById('offCanvasCloseBtn').click()
    localStorage.removeItem('token');
    showAlert("Logged Out Successfully","success")
    history('/login')
  }

  const handleBlurTxtInpt = () =>{
    setIsEditing(false)
  }

  const handleKeyPressTxtInpt = (e) =>{
      if (e.key === "Enter") {
        handleSubmitInptTxt()
        e.target.blur()
      }
  }

  const handleSubmitInptTxt = async() =>{
    const response  =await putApi(`api/auth/updateuser`,{name:userName})
    const data=response?._id
    if(data){
      showAlert("Name updated Successfully","success")
      fetchUserInfo()
    }else{
      showAlert("OOPS something went wrong","danger")
    }
  }

  return (
    <div >
      <div className="offcanvas offcanvas-end profile_card" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <button type="button" id="offCanvasCloseBtn" className="btn-close text-reset align-center ms-auto" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
          <h4 className="offcanvas-title mx-auto" id="offcanvasExampleLabel">My Profile</h4>
        <div className="offcanvas-body text-center">
          <div className='mt-4'>
            <img src='./profile.png' className='align-middle' style={{height:"150px",width:"auto"}} alt='Profile-avatar'/>
          </div>
          <div className='my-5'>
            <div className='d-flex justify-content-center'>
              {isEditing?<input type='text' className='profile_name' onBlur={handleBlurTxtInpt} value={userName} onKeyPress={handleKeyPressTxtInpt} onChange={(e)=>setUserName(e.target.value)} autoFocus/>:<h1>{userName}</h1>}
              <div className='align-bottom ms-3'>
                <i className="fa-regular fa-pen-to-square" onClick={()=>setIsEditing(true)}></i>
              </div>
            </div>
              <p>{userData?.email}</p>
          </div>
          <div className="d-grid gap-2 mx-3 my-3">
            <button className="btn add_note-button" type="button" data-bs-dismiss="offcanvas" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  )
}
    
export default Profile
