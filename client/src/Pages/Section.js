import React, {useEffect} from 'react'
import Commingsoon from '../Component/Commingsoon';
import {useNavigate} from 'react-router-dom';
import { LoggedInOrNot } from '../Component/LoggedInOrNot';
import { useState } from 'react';
const Section = () => {
    const [isloggedIn, setIsloggedIn] = useState(false);
    const navigate = useNavigate();
    const getStatusOfLoggedIn = () => {
        let LoggedInOrNots = LoggedInOrNot();
        if(!LoggedInOrNots){
            navigate("/signin");
        }
        setIsloggedIn(LoggedInOrNots);
    };
    useEffect(()=>{
        getStatusOfLoggedIn();
    },[])
  return (
     <Commingsoon/>
  )
}

export default Section