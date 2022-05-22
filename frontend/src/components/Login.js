import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { postApiWithoutToken } from '../utils/apiCalls'

const Login = (props) => {
    
    const [credentials,setCredentials] = useState({email:"",password:""})
    let history=useNavigate();
    const handleChange = (e) =>{
        setCredentials({
            ...credentials,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await postApiWithoutToken(`api/auth/login`,credentials);
        console.log(response)
        if(response.success){
            localStorage.setItem('token',response.authToken);
            props.showAlert("Logged In Successfully","success");
            history('/');
        }else{
            props.showAlert("Invalid Details","danger");
        }
    }
    return (
        <div className='mt-3'>
        <h2>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" value={credentials.email} name='email' onChange={handleChange} aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} name='password' onChange={handleChange} id="exampleInputPassword1"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
