import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom'

const Login=()=>{
    

   const [username,setUsername]=useState('');
   const [password,setPassword]=useState('');
   const navigate=useNavigate();

     const handleLogin=()=>{
        if(username=='admin' && password=='1234'){
            localStorage.setItem('auth','true');
            debugger
            navigate('/dashboard');
            
        }else{
            alert('Invalid Credentials')
        }
     };

     return(
        <div className="container">
            <h2>Login</h2>
            <input type='text' placeholder='Username' value={username} onChange={(e)=>{setUsername(e.target.value)}} />
            <input type='password' placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
            <button onClick={handleLogin}>Login</button>
        </div>
     );

}

export default Login;