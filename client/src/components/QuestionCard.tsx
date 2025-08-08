import React, { useState, useEffect, useMemo} from "react";
import { Question } from "../types/Question";
import handleAnswer from "../utils/HandleAnswer";
import AnswerFeedback from "./AnswerFeedback";

interface Props {
    question : Question;
    isLastQuestion: boolean;
    isGameEnded: boolean;
    setIsGameEnded: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentScore: React.Dispatch<React.SetStateAction<number>>,
    currentScore: number,
    nextQuestion: Function;
}

const QuestionCard: React.FC<Props> = ({ question, isGameEnded, setIsGameEnded, isLastQuestion, setCurrentScore, currentScore, nextQuestion}) => {
const allAnswers = [...question.incorrect_answers, question.correct_answer];
const shuffledAnswers = useMemo(() => {
return allAnswers.sort(()=> Math.random() - 0.5);
},[question])
const [correctAnswer, setCorrectAnswer] = useState<string>("");
const [selectedAnswer, setSelectedAnswer] = useState<string>("");
const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
const [isAnswerSent, setIsAnswerSent] = useState<boolean>(false);

return (
<div className="max-w-xl mx-auto bg-white shadow-md rounded-2xl p-6 my-2 text-black">
<p className="text-lg font-semibold mb-4"
dangerouslySetInnerHTML={{__html: question.question}}
/>
<div className="min-h-10 flex justify-center align-middle pb-2">
{correctAnswer && <AnswerFeedback feedback={feedback} onResetFeedback={()=> setFeedback(null)}/> }
</div>
<ul className="space-y-3">
{shuffledAnswers.map((answer, i) => (
    <li key={i}>
        <div className="flex flex-row gap-2 ">
        <button className={`w-full bg-blue-100
          ${(answer === selectedAnswer) && selectedAnswer !== correctAnswer  && (feedback === "incorrect") ? 'bg-red-500' : ''}
          ${answer === correctAnswer && 'bg-green-500' }
           hover:bg-blue-200 text-blue-800 font-medium py-2 px-4 rounded-xl 
           transition-colors duration-200 text-left w-[60%]`}
        dangerouslySetInnerHTML={{__html:answer }}
        onClick={ !isGameEnded && !isAnswerSent ? () => handleAnswer(
        question.id, 
        answer,
        setSelectedAnswer, 
        setCorrectAnswer, 
        isLastQuestion, 
        setIsGameEnded, 
        setCurrentScore, 
        setFeedback, 
        currentScore,
        nextQuestion,
        setIsAnswerSent
        ) : () => {return}} />
        {/* {answer === correctAnswer && <p >Correct Answer</p>} */}
        </div>
    </li>
))}
</ul>
</div>

)

}

export default QuestionCard;