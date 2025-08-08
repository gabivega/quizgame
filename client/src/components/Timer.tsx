import React , {useEffect, useState}from 'react'

type TimerProps = { 
  setIsGameEnded: React.Dispatch<React.SetStateAction<boolean>>, 
  isGameEnded:boolean, 
  currentScore:number}

const Timer = ({setIsGameEnded, isGameEnded, currentScore}: TimerProps) => {

const [timeLeft, setTimeLeft] = useState<number>(25);


useEffect(() => {

const interval = setInterval(() => {
setTimeLeft(prev => {
  if (prev === 1) {
    setIsGameEnded(true);
    clearInterval(interval);
    return 0;
  }
return prev - 1
});
}, 1000)
return ()=> clearInterval(interval)

}, [])

useEffect(() => {
setTimeLeft(prev => prev + 3)
}, [currentScore])


  return (
    <div className="flex flex-col items-center justify-center bg-white bg-opacity-10 rounded-xl px-6 py-3 shadow-md text-white">
  <h2 className="text-lg font-semibold mb-1">⏳ Time Left</h2>
  <p className="text-3xl font-bold tracking-wide text-yellow-300">{timeLeft}s</p>
</div>
  )
}

export default Timer;