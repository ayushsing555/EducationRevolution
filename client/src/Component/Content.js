import React from 'react';
import SmallNavbar from './SmallNavbar';
import Course from './SectionsAdd/Course';
import Section from './SectionsAdd/Section';
import Topic from './SectionsAdd/Topic';
import ContentArea from './SectionsAdd/Content';
const Content = () => {
    return (
        <>
            <SmallNavbar />
            <div class="text-center my-4">
                <h2 class="text-2xl text-blue-600 font-semibold">Add Content</h2>
            </div>
            <hr className='my-4' />
            <Course />
            <hr className='my-4' />
            <div className='bg bg-yellow-100'>
                <Section />
            </div>
            
            <hr className='my-4' />
            <Topic />
            <hr className='my-4'/>
            <ContentArea/>
        </>
    );
};

export default Content;