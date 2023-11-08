export async function AddCourseApi(courseName) {
    if (courseName === "") {
        return alert("please fill all the field");
    }
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    };

    let bodyContent = JSON.stringify({
        name: courseName
    });
    const response = await fetch("http://localhost:8000/add/course", {
        method: "POST",
        body: bodyContent,
        headers: headersList
    });
    const data = await response.json();
    if (data.success) {
        return true;
    }
    else {
        return alert("Invalid credentials");
    }
};
export async function AddSectionApi(courseName, sectionName) {
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    };

    let bodyContent = JSON.stringify({
        courseName: courseName,
        sectionName: sectionName
    });

    try {
        const response = await fetch("http://localhost:8000/add/section", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        // Log the status code

        const data = await response.json();
        // Log the data
        console.log("Response Data:", data.success);

        if (data.success) {
            return alert(data.message);
        }
        else {
            return alert(data.error);
        }
    } catch (error) {
        // Handle errors here
        console.error("API Error:", error);
    }

    // Return false or handle other cases as needed

}

export async function AddTopicApi(courseId, sectionId, topicName) {
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    };

    let bodyContent = JSON.stringify({
        courseId: courseId,
        sectionId: sectionId,
        topicName: topicName
    });
    try {
        const response = await fetch("http://localhost:8000/add/section/topic", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        // Log the status code

        const data = await response.json();
        // Log the data
        console.log("Response Data:", data.success);

        if (data.success) {
            alert(data.message);
            return true;
        }
        else {
            alert(data.message);
            return false;
        }
    } catch (error) {
        // Handle errors here
        console.error("API Error:", error);
    }
}

export async function AddContentApi(subtopics,section,topic,course){
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    };

    let bodyContent = JSON.stringify({
        courseId: course.label,
        sectionId: section.value,
        topicName: topic.label,
        topicId:topic.value,
        content:subtopics,
    });
    try{
        let response = await fetch("http://localhost:8000/add/content",{
            method:"post",
            headers:headersList,
            body:bodyContent
        })
        const data = await response.json();
        if(data.success){
            alert(data.message);
            return true;
        }
        else{
           alert(data.message);
            return false;  
        }
    }catch(error){
        console.log(error);
        return false;
    }
}
