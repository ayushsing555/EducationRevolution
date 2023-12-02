const  getRandomGenerateQuestion = (Questions,count)=>{
    const shuffledQuestions = Questions.sort(()=>(0.5)-Math.random());
    return shuffledQuestions.slice(0,count);
}
module.exports = {getRandomGenerateQuestion};