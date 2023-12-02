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