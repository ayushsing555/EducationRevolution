import React from 'react'
import { useState } from 'react';
import Modal from "react-modal";
const AddCourseBtn = ({getCourses}) => {
const [isModalOpen, setModalOpen] = useState(false);
    const [courseName,setCourseName] = useState("");
    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(courseName===""){
            return alert("please fill all the field");
        }
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        };

        let bodyContent = JSON.stringify({
            name:courseName
        });
        const response = await fetch("http://localhost:8000/add/course",{
           method: "POST",
            body: bodyContent,
            headers: headersList
        })
        const data = await response.json();
            if(data.success){
                alert("successfully added");
                getCourses();
                setModalOpen(false);
            }
            else{
                return alert("Invalid credentials");
            }
    }

    const openModal = () => {
        setModalOpen(true);
    };


    const closeModal = () => {
        setModalOpen(false);
    };
  return (
    <>

   
    <div>
        <button onClick={openModal} class="rounded mx-auto border text-white text-sm bg-blue-700 mt-2 p-3  flex justify-center items-center">Add More Course+</button>
    </div>
    <Modal isOpen={isModalOpen}>
                <h1 className="text-xl font-bold">Add a New Course</h1>
        <div className="mt-4">
          <label htmlFor="courseName" className="block text-gray-700 font-bold">Course Name</label>
          <input
            type="text"
            autoFocus
            id="courseName"
            value={courseName}
            onChange={(e)=>setCourseName(e.target.value)}
          />
        </div>
        <div className="mt-6">
          <button onClick={handleSubmit} className="btn-blue-700">Add</button>
        </div>
                
                <div className="flex justify-end">
                    <button 
                        onClick={closeModal}
                        className=" btn text-white bg-blue-700 p-2 modal-close  cursor-pointer"
                    >
                      close  &times;
                    </button>
                </div>

            </Modal>
     </>
  )
}

export default AddCourseBtn