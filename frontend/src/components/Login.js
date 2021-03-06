import React,{useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import alertContext from '../context/components/alertContext'
import { postApiWithoutToken } from '../utils/apiCalls'

const Login = () => {

    const contextAlert = useContext(alertContext);
    const {showAlert} = contextAlert;
    
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
            showAlert("Logged In Successfully","success");
            history('/');
        }else{
            showAlert("Invalid Details","danger");
        }
    }
    return (
        <div className='mt-3 login'>
        <h1 >Login</h1>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1"  value={credentials.email} name='email' onChange={handleChange} aria-describedby="emailHelp" required />
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} name='password' onChange={handleChange} id="exampleInputPassword1" required/>
                </div>
                <input type="submit" value="Submit" className="btn add_note-button"/>
            </form>
        </div>
    )
}

export default Login
