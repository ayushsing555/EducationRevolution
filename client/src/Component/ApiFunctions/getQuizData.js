export async function getQuizForDate(date) {
    console.log(date);
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    };
    const response = await fetch('https://educationrevolution-1.onrender.com/dailyQuiz', {
        method: 'get',
        headers: headersList
    });
    const data = await response.json();
    const filterData = data.filter((elem) => {
        const dbDate = new Date(elem.date);
        return dbDate.toDateString() === date.toDateString();
    });
    return filterData;
}

export async function getCourseQuiz(name) {
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    };
    const response = await fetch(`https://educationrevolution-1.onrender.com/courseQuiz/${name}`, {
        method: 'get',
        headers: headersList
    });
    const data = await response.json();
    if (data.success) {
        return data.data;
    }
    return false;
}

export async function getSectionQuiz(name, sectionId) {
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    };
    const response = await fetch(`https://educationrevolution-1.onrender.com/courseQuiz/${name}/${sectionId}`, {
        method: 'get',
        headers: headersList
    });
    const data = await response.json();
    if (data.success) {
        return data.data;
    }
    return false;
}

export async function getTopicQuiz(name, sectionId, topicId) {
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    };
    const response = await fetch(`https://educationrevolution-1.onrender.com/courseQuiz/${name}/${sectionId}/${topicId}`, {
        method: 'get',
        headers: headersList
    });
    const data = await response.json();
    if (data.success) {
        return data.data;
    }
    return false;
}

export async function getCourseSingleQuiz(name, QuizId) {
    console.log(name, QuizId);
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    };
    const response = await fetch(`https://educationrevolution-1.onrender.com/Quiz/${name}/${QuizId}`, {
        method: 'get',
        headers: headersList
    });
    const data = await response.json();
    if (data.success) {
        return data.data;
    }
    return false;
}
export async function getSectionSingleQuiz(name, sectionId, QuizId) {
    console.log(name, sectionId, QuizId);
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    };
    const response = await fetch(`https://educationrevolution-1.onrender.com/Quiz/${name}/${sectionId}/${QuizId}`, {
        method: 'get',
        headers: headersList
    });
    const data = await response.json();
    if (data.success) {
        return data.data;
    }
    return false;
}
export async function getTopicSingleQuiz(name, sectionId, TopicId, QuizId) {
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    };
    const response = await fetch(`https://educationrevolution-1.onrender.com/Quiz/${name}/${sectionId}/${TopicId}/${QuizId}`, {
        method: 'get',
        headers: headersList
    });
    const data = await response.json();
    if (data.success) {
        return data.data;
    }
    return false;
}

export async function getScheduledQuiz() {
    console.log("function invokeds");
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    };
    const response = await fetch(`https://educationrevolution-1.onrender.com/scheduledQuiz`, {
        method: 'get',
        headers: headersList
    });
    const data = await response.json();
    if (data.success) {
        return data.data;
    }
    return false;
}

export async function getScheduledQuizDataById(id) {
    console.log("function invokeds", id);
    let QuizData = [];
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    };
    const response = await fetch(`https://educationrevolution-1.onrender.com/scheduledQuiz`, {
        method: 'get',
        headers: headersList
    });
    const data = await response.json();
    if (data.success) {
        let QuizData = data.data.filter((elem) => {
            return id === elem._id;
        });
        console.log(QuizData[0]);
        console.log(new Date());
        console.log(QuizData[0].date);
        if (new Date() < new Date(QuizData[0].date)) {
            alert(`this Quiz Is not Started`);
            return false;
        }
        return QuizData;
    }
    return false;
}