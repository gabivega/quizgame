import React, { useEffect, useState } from 'react';
import { Question } from './types/Question';
import QuestionCard from './components/QuestionCard';
import './index.css';
import Timer from './components/Timer';
import EndGameCard from './components/EndGameCard';
import ScoreCard from './components/ScoreCard';
import { scoreType } from './types/scoreType';
import Spinner from './components/Spinner';

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [isGameStarted, setGameStarted] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isGameEnded, setIsGameEnded] = useState<boolean>(false);
  const [isLastQuestion, setIsLastQuestion] = useState<boolean>(false);
  const [scores, setScores] = useState<scoreType[]>([]);
const [isLoading, setisLoading] = useState<boolean>(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;


 const fetchQuestions = async (category: string) => {
   setisLoading(true)      
    try {
      const res = await fetch(`${baseUrl}/api/questions?category=${category}`);
      const data = await res.json();
      setQuestions(data);
      setGameStarted(true);
      setCurrentScore(0);
      // console.log(data)
    } catch (error) {
      console.error("error al cargar preguntas", error)
    }
    setisLoading(false)
  }
 const reloadQuestions = async (category: string) => {
    try {
      const res = await fetch(`${baseUrl}/api/questions?category=${category}`);
      const data = await res.json();
      setQuestions((prevQuestions)=> [...prevQuestions, ...data]);
    } catch (error) {
      console.error("error al cargar preguntas", error)
    }
  }

useEffect(() => {
reloadQuestions(selectedCategory)
}, [isLastQuestion])

// useEffect(() => {
// setSelectedCategory("")
// }, [isGameEnded])


const nextQuestion = () => {
  if (currentQuestion === (questions.length - 2)) {
    setIsLastQuestion(true);
    // return
    // return alert("No hay mas preguntas")
  }
  setTimeout(()=> {
    setCurrentQuestion(currentQuestion + 1);
  }, 1000)
}

  return (
    <div className='flex flex-col items-center align-middle w-full min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-900 text-white py-10'>
       {isGameEnded && 
      <EndGameCard 
      setIsGameEnded={setIsGameEnded} 
      setGameStarted={setGameStarted} 
      setIsLastQuestion={setIsLastQuestion} 
      setCurrentQuestion={setCurrentQuestion} 
      currentScore={currentScore}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      scores={scores} />}      
       {!isGameEnded && <h1 className="text-4xl font-bold my-4 drop-shadow-lg ">🎮 Trivia APP</h1>}
      {isGameStarted && questions?.length > 0 ?( !isGameEnded &&
        <>
        <div className='flex flex-row gap-4 justify-center align-middle'>        
        <Timer setIsGameEnded={setIsGameEnded} isGameEnded={isGameEnded} currentScore={currentScore}/>
          <p className='text-2xl text-bold my-auto'>Score: {currentScore}</p>
        </div>
        <QuestionCard question={questions[currentQuestion]} 
        setCurrentScore= {setCurrentScore} 
        currentScore={currentScore} 
        isGameEnded= {isGameEnded} 
        isLastQuestion= {isLastQuestion} 
        setIsGameEnded={setIsGameEnded}
        nextQuestion={nextQuestion}
        />
        </>
      ) : 
      (<div className='w-full flex flex-col '>
        <h2 className="text-2xl font-semibold mb-4 w-96 mx-auto">Choose a Category</h2>
         <select
    onChange={(e) => {setSelectedCategory(e.target.value)}}
    className="mb-6 px-6 py-3 w-96 mx-auto rounded-xl text-lg bg-white text-slate-800 
    shadow-md focus:outline-none focus:ring-2 focus:ring-sky-400 transition duration-300"
    >     
          <option value="">All Categories</option>
          <option value="9">General Knowledge</option>
          <option value="25">Art</option>
          <option value="27">Animals</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="10">Books</option>
          <option value="12">Music</option>
          <option value="11">Movies</option>
          <option value="17">Science & Nature</option>
          <option value="19">Science: Mathematics</option>
          <option value="24">Politics</option>
          <option value="21">Sports</option>
          <option value="28">Vehicles</option>
        </select>
        <button
    onClick={() => fetchQuestions(selectedCategory)}
    className="px-8 py-3 bg-white w-96 mx-auto text-indigo-800 font-semibold rounded-full text-lg shadow-lg hover:scale-105 hover:bg-opacity-90 transition-all duration-300 active:scale-95"
    >
    🚀 Start Game
  </button>
  {isLoading && <Spinner />}
  <ScoreCard scores={scores} setScores={setScores} selectedCategory={selectedCategory}/>
      </div>)
      }
     
    </div>
  );
}

export default App;
