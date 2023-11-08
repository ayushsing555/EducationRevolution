export async function getAllCourses() {
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    };
    const response = await fetch("http://localhost:8000/course", {
        method: "get",
        headers: headersList
    });
    const data = await response.json();
    return data;
}

export async function getIndividualCourse(courseName) {
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    };
    const response = await fetch(`http://localhost:8000/course/${courseName}`, {
        method: "get",
        headers: headersList
    });
    const data = await response.json();
    return data.sections;
}

export async function getTopicsAndSectionName(courseName, sectionId) {
    let result = [];
    result.push({course: {label: courseName}});
    const data = await getAllCourses();
    let course = data.filter((c) => c.name === courseName);
    if (course) {
        const Onesection = course[0].sections.filter((s) => s._id === sectionId);
        if (Onesection) {
            result.push({
                section: {
                    label: Onesection[0].name,
                    value: Onesection[0]._id,
                    topics:Onesection[0].Topic
                }
            });
            return  result;
                
        }
    }
    return result;
       
}

export async function getContent(courseName, SectionId, TopicId) {
    const result = [];
    const data = await getIndividualCourse(courseName);
    result.push({course: {label: courseName}});
    let section = data.filter((elem) => elem._id === SectionId);
    console.log(section);
    result.push({
        section: {
            label: section[0].name,
            value: section[0]._id
        }
    });
    if (section) {
        const topic = section[0].Topic.filter((elem) => elem._id === TopicId);
        console.log(topic);
        if (topic) {
            result.push({
                topic: {
                    label: topic[0].name,
                    value: topic[0]._id,
                    content: topic[0].content
                }
            });
            console.log(result);
            return {
                result
            };
        }
    }
}