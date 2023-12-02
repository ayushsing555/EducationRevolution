import React from 'react'
import { useState } from 'react'
import   {Link, useNavigate} from 'react-router-dom';
import { validEmail } from '../Component/ValidEmail';

const Signin = ({functionCall}) => {
    const router = useNavigate();
    const [userDetail,setUserDetail] = useState({
        password:"",email:""
    })
    const handleChange=async(e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setUserDetail({...userDetail,[name]:value});
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(userDetail.email===""||userDetail.password===""){
            return alert("please fill all the field");
        }
        if(!validEmail(userDetail.email)){
            return alert("Please enter valid email");
        }
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        };

        let bodyContent = JSON.stringify({
            email:userDetail.email,
            password:userDetail.password
        });
        const response = await fetch("http://localhost:8000/login/user",{
           method: "POST",
            body: bodyContent,
            headers: headersList
        })
        const data = await response.json();
            if(data.success){
                alert("successfully logged in");
                localStorage.setItem("Detail",JSON.stringify(data));
                
                functionCall(true);
                window.location.href = '/';
            }
            else{
                return alert("Invalid credentials");
            }
    }
  return (
    <>
    <div className="bg-gray-100 flex items-center justify-center h-auto">
            <div className="bg-white p-8 rounded shadow-md w-96 flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold mb-2">Sign in</h1>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600 font-medium">Email</label>
                        <input value={userDetail.name} onChange={handleChange} type="email" id="email" name="email" className="w-full border p-2 rounded" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600 font-medium">Password</label>
                        <input value={userDetail.password} onChange={handleChange} type="password" id="password" name="password" className="w-full border p-2 rounded" />
                    </div>
                    <button type="submit" onClick={handleSubmit} className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600">Sign Up</button>
                </form>
            </div>
            </div>
    </>
  )
}

export default Signin