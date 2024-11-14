import {getUserDetail} from "../Functionality/GetUserDetail";

export async function AddQuizContent(Quiz, Name, sectionId, topicId, QuizName) {
    console.log(Quiz, "ayush");
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    };

    let bodyContent = JSON.stringify({
        Quiz: Quiz,
        name: Name,
        sectionId: sectionId,
        topicId: topicId,
        QuizName: QuizName
    });
    const response = await fetch("https://educationrevolution-1.onrender.com/add/content/Quiz", {
        method: "post",
        body: bodyContent,
        headers: headersList
    });
    const data = await response.json();
    if (data.success) {
        return data.success;
    } else {
        alert(data.error);
    }
}

export async function AddQuizSection(Quiz, Name, sectionId, QuizName) {
    console.log(Quiz, Name, sectionId, QuizName);
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    };

    let bodyContent = JSON.stringify({
        Quiz: Quiz,
        name: Name,
        sectionId: sectionId,
        QuizName: QuizName
    });

    const response = await fetch("https://educationrevolution-1.onrender.com/add/section/Quiz", {
        method: "post",
        body: bodyContent,
        headers: headersList
    });
    const data = await response.json();
    if (data.success) {
        return data.success;
    } else {
        alert(data.error);
    }
}

export async function AddQuizCourse(Quiz, Name, QuizName) {
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    };

    let bodyContent = JSON.stringify({
        Quiz: Quiz,
        name: Name,
        QuizName: QuizName
    });

    const response = await fetch("https://educationrevolution-1.onrender.com/add/course/Quiz", {
        method: "post",
        body: bodyContent,
        headers: headersList
    });
    const data = await response.json();
    if (data.success) {
        return data.success;
    } else {
        alert(data.error);
    }
}

export async function sendResult(elem, score, wrongAnswer, isCurrentDay) {
    try {
        const userDetail = getUserDetail();
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        };
        let bodyContent = JSON.stringify({
            score: score,
            email: userDetail.email,
            wrongAnswer: wrongAnswer,
            isCurrentDay: isCurrentDay
        });

        const response = await fetch(`https://educationrevolution-1.onrender.com/saveResult/${elem._id}`, {
            method: "post",
            headers: headersList,
            body: bodyContent
        });

        const data = await response.json();
        if (data.success) {
            return data.success;
        } else {
            return false;
        }
    }
    catch (error) {
        console.log(error);
    }
}

export async function AddCoins(email) {
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    };
    const response = await fetch(`https://educationrevolution-1.onrender.com/${email}/addCoin}`, {
        method: "post",
        headers: headersList,
    });
    const data = await response.json();
    if (data.success) {
        return true;
    }
    return false;

}

export async function SendRandomQuiz(QuizName, timeDuration, selectedDate, questions) {
    console.log(QuizName, timeDuration, selectedDate, questions);
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    };
    const response = await fetch("https://educationrevolution-1.onrender.com/add/randomQuiz", {
        method: 'post',
        body: JSON.stringify({
            Questions: questions,
            timeDuration: timeDuration,
            QuizDate: selectedDate,
            QuizName: QuizName
        }),
        headers: headersList
    });
    const data = await response.json();
    if (data.success) {
        return true;
    }
    else {
        alert(data.error);
    }

}