export async function sendNotificationForQuiz(id) {
    try {
        console.log(id);
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json",

        };
        let bodyContent = JSON.stringify({
            QuizId: id
        });
        const response = await fetch(`http://localhost:8000/sendEmailForQuiz`, {
            method: 'post',
            headers: headersList,
            body: bodyContent
        });
        const data = await response.json();
        if (data.success) {
            return data;
        }
        else {
            return false;
        }
    } catch (error) {

    }
}