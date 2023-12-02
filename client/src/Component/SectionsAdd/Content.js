import React from 'react';
import {useState, useEffect} from 'react';
// import AddCourseBtn from '../AddCourseBtn';
import {IoMdRefresh} from 'react-icons/io';
import {getAllCourses, getIndividualCourse,getTopicsAndSectionName} from '../ApiFunctions/getAllCourses';
import AddContentBtn from "../AddContentBtn";
import Select from 'react-select';
import { Typography } from '@mui/material';
import AddQuizBtn from '../QuizAdmin/AddContentQuizBtn';
const ContentArea = () => {
    const [course, setCourse] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);
    const [selectTopic,setSelectTopic] = useState(null);
    const [Topic,setTopic] = useState([]);
    const [section, setSection] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchIndividualData(selectedCourse);
    }, [selectedCourse]);

    useEffect(()=>{
        fetchIndividualDataTopics(selectedCourse,selectedSection);
    },[selectedSection])

    const fetchIndividualData = async (selectedCourse) => {
        if (selectedCourse != null) {
            const data = await getIndividualCourse(selectedCourse.label);
            console.log(data);
            setSelectedSection(null);
            setSection(data);
        }
    };

    const fetchIndividualDataTopics = async(selectedCourse,selectedSection)=>{
         if(selectedCourse!=null&&selectedSection!=null){
            const data = await getTopicsAndSectionName(selectedCourse.label,selectedSection.value);
            setSelectTopic(null);
            setTopic(data[1].section.topics.reverse());
         }
    }

    const fetchData = async () => {
        const data = await getAllCourses();
        setCourse(data);
    };

    const refresh=()=>{
        fetchData();
        
    }

    const courseOptions = course.map((elem) => ({
        value: elem._id,
        label: elem.name,
    }));

    const sectionOptions = section.map((elem) => ({
        value: elem._id,
        label: elem.name
    }));

    console.log(Topic);

    const TopicOptions = Topic.map((elem)=>({
        value:elem._id,
        label:elem.name
    }))

    return (
        <>
            <div class="bg-blue-100 p-4">
               <Typography variant="h4" component="h1" align="center" gutterBottom>
          Add Content
        </Typography>
                <div class="flex justify-around">
                    <Select
                        className="w-64" // Set a width for the dropdown
                        options={courseOptions}
                        value={selectedCourse}
                        onChange={(option) => setSelectedCourse(option)}
                        isSearchable
                        placeholder="Select an option"
                    />
                    <Select
                        className="w-64" // Set a width for the dropdown
                        options={sectionOptions}
                        value={selectedSection}
                        onChange={(option) => setSelectedSection(option)}
                        isSearchable
                        placeholder="Select an Section"
                    />
                    <Select
                        className="w-64" // Set a width for the dropdown
                        options={TopicOptions}
                        value={selectTopic}
                        onChange={(option) => setSelectTopic(option)}
                        isSearchable
                        placeholder="Select an Topic"
                    />
                    <button onClick={refresh} className="p-2 bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-full">
                        <IoMdRefresh />
                    </button>
                    {/* <!-- Add additional dropdowns here if needed --> */}
                    <AddContentBtn part="Topic" course={selectedCourse} section={selectedSection} Topic={selectTopic} refreshData={fetchData} />
                    <AddQuizBtn part="Topic" course={selectedCourse} section={selectedSection} Topic={selectTopic}  />
                </div>
            </div>
        </>
    );
};

export default ContentArea;
