import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { validEmail } from '../Component/ValidEmail';
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from 'react-toastify';
import { GetPasswordFun } from '../Component/Functionality/GetPasswordFun';
const Signup = () => {
    const router = useNavigate();
    const [showEmail, setShowEmail] = useState(true);
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState(0);
    const [userDetail, setUserDetail] = useState({
        name: "", email: "", gender: "", password: "", cpassword: "", otp: ""
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserDetail({...userDetail, [name]: value});
    };


    const sendOtp = async (event) => {
        event.preventDefault();
        if (userDetail.password !== userDetail.cpassword) {
            return alert("Password doesn't match");
        }
        if(!validEmail(userDetail.email)){
            return alert("please Enter Valid Email");
        }
        if (userDetail.email === "") {
            return alert("please enter valid email");
        }
        change(event);
        event.preventDefault();
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        };

        let bodyContent = JSON.stringify({
            "email": userDetail.email
        });

        let response = await fetch("http://localhost:8000/SendOtp", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        const data = await response.json();
        console.log(data);
        if (data.result) {
            toast.success('Otp Sent your Email', {
            position: 'bottom-right',
            autoClose: 2000, // Time in milliseconds, set to 0 to disable auto-close
        });
            setOtp(data.otp);
        }
        else{
            return alert("something went wrong!try Again");
        }
    };

    const change = async (event) => {
        event.preventDefault();
        setShowEmail(!showEmail);
        setShowOtp(!showOtp);
    };

    const GetPassword = (e) =>{
        e.preventDefault();
        const password = GetPasswordFun();
        console.log(password); 
        setUserDetail({...userDetail,
        password:password,
        cpassword:password
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(userDetail.otp!==otp){
           return alert("please enter valid otp");
        }
        if(userDetail.name===""||userDetail.password===""||userDetail.email===""||userDetail.gender===""){
            return alert("please fill all the field");
        }
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        };
        let bodyContent = JSON.stringify({
            "name": userDetail.name,
                "email": userDetail.email,
                "gender": userDetail.gender,
                "password": userDetail.password
        });
        const response = await fetch("http://localhost:8000/register/user", {
            method: "post",
            body: bodyContent,
            headers:headersList
        });
        const data = await response.json();
        console.log(data);
        if (data.success) {
            alert("account created");
            router("/signin");
        } else {
            alert(data.error);
        }
    };
    return (
        <>
            <div className="bg-gray-100 flex items-center justify-center h-auto">
                <div className="bg-white p-8 rounded shadow-md w-96 flex flex-col justify-center items-center">
                    <h1 className="text-2xl font-bold mb-2">Sign Up</h1>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-600 font-medium">Name</label>
                            <input value={userDetail.name} onChange={handleChange} type="text" id="name" name="name" className="w-full border p-2 rounded" />
                        </div>
                        {
                            showEmail ? <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-600 font-medium">Email</label>
                                <input value={userDetail.email} onChange={handleChange} type="email" id="email" name="email" className="w-full border p-2 rounded" />
                            </div> : ""
                        }

                        <div className="mb-4">
                            <label className="block text-gray-600 font-medium">Gender</label>
                            <div className="flex">
                                <label htmlFor="male" className="mr-2">
                                    <input onChange={handleChange} type="radio" id="male" name="gender" value="male" className="mr-1" /> Male
                                </label>
                                <label htmlFor="female">
                                    <input onChange={handleChange} type="radio" id="female" name="gender" value="female" className="mr-1" /> Female
                                </label>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-600 font-medium">Password</label>
                            <input value={userDetail.password} onChange={handleChange} type="text" id="password" name="password" className="w-full border p-2 rounded" />
                        </div>
                                <button type="submit" onClick={GetPassword} className="bg-blue-400 text-white rounded p-1 w-full hover:bg-blue-600">Suggest Password</button>
                        <div className="mb-4">
                            <label htmlFor="cpassword" className="block text-gray-600 font-medium">Confirm Password</label>
                            <input value={userDetail.cpassword} onChange={handleChange} type="password" id="password" name="cpassword" className="w-full border p-2 rounded" />
                        </div>
                        {
                            showOtp ? <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-600 font-medium">Otp</label>
                                <input value={userDetail.otp} onChange={handleChange} type="password" id="password" name="otp" className="w-full border p-2 rounded" />
                                <button type="submit" onClick={handleSubmit} className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600">Verify</button>
                            </div> : ""
                        }
                        {
                            showEmail ? <button type="submit" onClick={sendOtp} className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600">Signup</button> :
                                <button type="submit" onClick={change} className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600">Change Email</button>
                        }
                    </form>
                </div>
            </div>
            <ToastContainer/>
        </>
    );
};


export default Signup;