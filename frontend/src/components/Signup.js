import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/components/alertContext';
import { postApiWithoutToken } from '../utils/apiCalls';

const Signup = () => {
  const context = useContext(alertContext);
  const {showAlert} = context;
  const [credentials,setCredentials] = useState({name:"",email:"",password:"",password2:""});

  const [error, setError] = useState({
    name: '',
    email:'',
    password: '',
    password2: ''
  })

  let history=useNavigate();

  const handleChange = (e) =>{
    setCredentials({
      ...credentials,
      [e.target.name]:e.target.value
    })
    validateInput(e)
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const response=await postApiWithoutToken(`api/auth/createuser`,{name:credentials.name,email:credentials.email,password:credentials.password})
    console.log(response);
    if(response.success){
      localStorage.setItem('token',response.authToken);
      showAlert("Account Created Successfully","success");
      history('/');
    }else{
      showAlert("Invalid Credentials","danger");
    }
  }

  const validateInput = e => {
    let { name, value } = e.target;
    setError(prev => {
      const stateObj = { ...prev, [name]: "" };
   
      switch (name) {
        case "name":
          if (!value) {
            stateObj[name] = "Please enter valid Name.";
          }
          break;

        case "email":
          if (!value) {
            stateObj[name] = "Please enter valid Email.";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (credentials.password2 && value !== credentials.password2) {
            stateObj["password2"] = "Password and Confirm Password does not match.";
          } else {
            stateObj["password2"] = credentials.password2 ? "" : error.password2;
          }
          break;
   
        case "password2":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (credentials.password && value !== credentials.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;
   
        default:
          break;
      }
   
      return stateObj;
    });
  }

  return (

        <div className='mt-3 login'>
            <h1>Create Account</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" value={credentials.name} name='name' onChange={handleChange} required/>
                  {error.name && <span className='err'>{error.name}</span>}
              </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} name='email' onChange={handleChange} aria-describedby="emailHelp" required/>
                    {error.email && <span className='err'>{error.email}</span>}
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input  type="password" className="form-control" value={credentials.password} name='password' onChange={handleChange} id="password" minLength={5} required 
                   />
                   {error.password && <span className='err'>{error.password}</span>}
 
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input  type="password" className="form-control" value={credentials.password2} name='password2' onChange={handleChange} id="password2" minLength={5} required
                    />
                    {error.password2 && <span className='err'>{error.password2}</span>}
 
                </div>
                <input type="submit" value='submit' className="btn add_note-button"/>
            </form>
        </div>
    )

}

export default Signup
