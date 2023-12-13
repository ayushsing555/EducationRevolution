export async function getQuizForDate(date){
    console.log(date);
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    };
    const response = await fetch('http://localhost:8000/dailyQuiz',{
        method:'get',
        headers:headersList
    })
    const data = await response.json();
    const filterData = data.filter((elem) => {
      const dbDate = new Date(elem.date);
      return dbDate.toDateString() === date.toDateString();
    });
    return filterData;
}

export async function getCourseQuiz(name){
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    }
    const response = await fetch(`http://localhost:8000/courseQuiz/${name}`,{
        method:'get',
        headers:headersList
    })
    const data = await response.json();
    if(data.success){
        return data.data;
    }
    return false;
}

export async function getSectionQuiz(name,sectionId){
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    }
    const response = await fetch(`http://localhost:8000/courseQuiz/${name}/${sectionId}`,{
        method:'get',
        headers:headersList
    })
    const data = await response.json();
    if(data.success){
        return data.data;
    }
    return false;
}

export async function getTopicQuiz(name,sectionId,topicId){
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    }
    const response = await fetch(`http://localhost:8000/courseQuiz/${name}/${sectionId}/${topicId}`,{
        method:'get',
        headers:headersList
    })
    const data = await response.json();
    if(data.success){
        return data.data;
    }
    return false;
}