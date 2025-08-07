import React , {useEffect, useState}from 'react';
import { scoreType } from '../types/scoreType';
import SectionSpinner from './Spinner-section';

type ScoreCardProps = {
  scores: scoreType[];
  setScores: React.Dispatch<React.SetStateAction<scoreType[]>>;
  selectedCategory: string
};
const baseUrl = process.env.REACT_APP_BASE_URL;
const ScoreCard = ({ scores, setScores, selectedCategory }: ScoreCardProps) => {

  
 const categoryMap: { [key: string]: string } = {
  "": "All",
  "9": "General Knowledge",
  "25": "Art",
  "27": "Animals",
  "22": "Geography",
  "23": "History",
  "10": "Books",
  "12": "Music",
  "11": "Movies",
  "17": "Science & Nature",
  "19": "Science: Mathematics",
  "24": "Politics",
  "21": "Sports",
  "28": "Vehicles",
};


const [category, setCategory] = useState("all");
const [isLoading, setIsLoading] = useState<boolean>(false);
// const [scores, setScores] = useState<scoreType[]>([]);

useEffect(() => {
 const res = async ()=> {
  setIsLoading(true)
   const res = await fetch(`${baseUrl}/api/scores/${category}`);
   const data:scoreType[] = await res.json();
   data.sort((a,b) => 
    b.score - a.score
   )
   setScores(data);
 }
 res();
 setIsLoading(false)
}, [])


  return (
    <div className='border-2 border-white rounded-lg m-6 p-2'>
        <h2 className='text-2xl font-bold my-4 drop-shadow-lg text-center'>Top 20 Score Board</h2>
        {selectedCategory && <p className='text-xl font-bold my-4 drop-shadow-lg text-center '>{categoryMap[selectedCategory]}</p>}     
{ isLoading ? <SectionSpinner /> :     
  <table className="table-auto border-collapse border border-gray-400 w-[50%] mx-auto mt-4">
  <thead className="">
    <tr>
      <th className="border border-gray-300 px-4 py-2 text-left w-4">#</th>
      <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
      <th className="border border-gray-300 px-4 py-2 text-left w-4">Points</th>
      {selectedCategory === "" && <th className="border border-gray-300 px-4 py-2 text-left w-4">Category</th>}
    </tr>
  </thead>
  <tbody>
    {scores.filter(scores=> scores.category === selectedCategory || selectedCategory === "").slice(0,20).map((score, index,) => (
      <tr key={score._id} className={index % 2 === 0 ? "" : ""}>
        <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
        <td className="border border-gray-300 px-4 py-2">{score.name}</td>
        <td className="border border-gray-300 px-4 py-2">{score.score}</td>
       { selectedCategory === "" && <td className="border border-gray-300 px-4 py-2">{categoryMap[score.category]}</td>}
      </tr>
    ))}
  </tbody>
</table>}
    </div>
  )
}

export default ScoreCard