const handleAnswer = async(
    questionId:string, 
    selectedOption:string,
    setSelectedAnswer:React.Dispatch<React.SetStateAction<string>>,
    setCorrectAnswer:React.Dispatch<React.SetStateAction<string>>, 
    isLastQuestion: boolean,
    setIsGameEnded:React.Dispatch<React.SetStateAction<boolean>>,
    setCurrentScore: React.Dispatch<React.SetStateAction<number>>,
    setFeedback: React.Dispatch<React.SetStateAction<"correct" | "incorrect" | null>>,
    currentScore: number,
    nextQuestion: Function
) => {

    const baseUrl = process.env.REACT_APP_BASE_URL;
    setCorrectAnswer("");
setSelectedAnswer(selectedOption);
const res = await fetch(`${baseUrl}/api/answers`, {
    method: "POST",
    headers: { "Content-type": "application/json"},
    body: JSON.stringify({ questionId, selectedOption})
})
const respuesta = await res.json();
// console.log(respuesta);
setCorrectAnswer(respuesta.question);
if (respuesta.isCorrect === true) {
    setFeedback("correct");
    setCurrentScore(currentScore + 1)
}
else setFeedback("incorrect");
// if (isLastQuestion) {
//     setIsGameEnded(true)
// }
nextQuestion();
return respuesta.question;
}

export default handleAnswer;