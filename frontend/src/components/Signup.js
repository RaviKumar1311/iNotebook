import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/components/alertContext';
import { postApiWithoutToken } from '../utils/apiCalls';

const Signup = () => {
  const context = useContext(alertContext);
  const {showAlert} = context;
  const [credentials,setCredentials] = useState({name:"",email:"",password:"",password2:""});
  let history=useNavigate();
  const handleChange = (e) =>{
    setCredentials({
      ...credentials,
      [e.target.name]:e.target.value
    })
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

  return (

        <div className='mt-3'>
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" value={credentials.name} name='name' onChange={handleChange}/>
              </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} name='email' onChange={handleChange} aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} name='password' onChange={handleChange} id="password" minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" value={credentials.password2} name='password2' onChange={handleChange} id="password2" minLength={5} required/>
                </div>
                <button disabled={credentials.password!==credentials.password2} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )

}

export default Signup
