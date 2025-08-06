import React , {useEffect} from 'react'
import ScoreCard from './ScoreCard';
import SaveScore from './SaveScore';
import { scoreType } from '../types/scoreType';
interface Props {     
    setIsGameEnded: React.Dispatch<React.SetStateAction<boolean>>,
    setGameStarted: React.Dispatch<React.SetStateAction<boolean>>,
    setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>,
    setIsLastQuestion: React.Dispatch<React.SetStateAction<boolean>>,
    currentScore: number,
    selectedCategory: string,
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>,
    scores: scoreType[];
}

const EndGameCard: React.FC<Props> = ({
  setIsGameEnded, 
  setGameStarted, 
  setCurrentQuestion, 
  setIsLastQuestion, 
  currentScore, 
  selectedCategory,
  setSelectedCategory, 
  scores}) => {

    useEffect(() => {
     const res = async ()=> {
       const res = await fetch(`http://localhost:3000/api/scores/${selectedCategory}`);
       const data = await res.json();
      //  setScores(data);
     }
     res();
    }, [])

  return (
    <div className='flex flex-col items-center justify-center gap-6 relative z-10 max-w-md
     mx-auto my-auto bg-gradient-to-br from-sky-700 to-violet-800 p-12 rounded-2xl 
     shadow-2xl border-4 border-white/10 text-white text-center animate-fade-in top-[10%]'>
          <h2 className="text-4xl font-bold tracking-wide">🎮 Game Over!</h2>
           <p className="text-2xl font-medium">Your Score: <span className="font-bold">{currentScore}</span></p>
          <button className='mt-4 px-8 py-3 bg-white text-sky-800 font-bold rounded-full text-lg shadow-md transition-all duration-300 hover:scale-105 hover:bg-opacity-90 active:scale-95' onClick={()=> {
            setCurrentQuestion(0);
            setGameStarted(false);
            setIsGameEnded(false);
            setIsLastQuestion(false);
            setSelectedCategory("");          
            // setCurrentScore(0);
          }}>PLAY AGAIN</button>
          <SaveScore currentScore={currentScore} selectedCategory={selectedCategory} scores={scores}/>
        </div>
  )
}

export default EndGameCard