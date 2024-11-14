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
        const response = await fetch(`https://educationrevolution-1.onrender.com/sendEmailForQuiz`, {
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