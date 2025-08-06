import React , {useEffect, useState}from 'react'
import { scoreType } from '../types/scoreType'
interface Props {    
    currentScore: number,
    selectedCategory: string,
    scores: scoreType[]
}
const baseUrl = process.env.REACT_APP_BASE_URL;

const SaveScore : React.FC<Props> = (
  {
  currentScore, 
  selectedCategory,
  scores
  }
) => {

// const [category, setCategory] = useState<string>("all");
const [currentRanking, setCurrentRanking] = useState<number>(0);
const [name, setName] = useState<string>("");
const [isSaved, setIsSaved] = useState<Boolean>(false);
let score = currentScore;
let category = selectedCategory;

useEffect(() => {
  console.log("selected category: ", category)
 const res = async ()=> {
   const res = await fetch(`${baseUrl}/api/scores/getPosition`, {
    method : "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify({"score": currentScore})
   });
   const data = await res.json();
   setCurrentRanking(data.position)
 }
 res();
}, [])

const saveRanking = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/scores`, {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({name, score, category})
    })
    setIsSaved(true)
    
  } catch (error) {
    
  }
}


  return (
    <div className='border-2 border-white rounded-lg m-6 p-2'>
      {!isSaved ? (<>
        <h3>Yor Current Global Ranking is: <span className='text-xl font-bold'> {currentRanking}</span></h3>
        <p>Save your Name in the ranking!</p>
          <input  className="my-2 px-6 py-1 w-60 mx-auto rounded-xl text-lg bg-white text-slate-800 
    shadow-md focus:outline-none focus:ring-2 focus:ring-sky-400 transition duration-300"
     onChange={(e) => setName(e.target.value)} />
          <button onClick={saveRanking} className='mt-4 px-8 py-1 bg-white text-sky-800 font-bold rounded-full text-lg shadow-md transition-all duration-300 hover:scale-105 hover:bg-opacity-90 active:scale-95'>SAVE</button>
        </>
      ) : (<><h2>Thanks for Playing!</h2></>)}
        {/* <h2 className='text-2xl font-bold my-4 drop-shadow-lg text-center'>Score Board</h2>        
        { scores.map((score) => (
            <p key={score.name}>{score.name} - {score.score} - {score.category}</p>)
        )} */}
    </div>
  )
}

export default SaveScore