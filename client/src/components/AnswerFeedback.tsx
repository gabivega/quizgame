import React, {useState, useEffect}from 'react';


interface feedbackProps {
    feedback : "correct" | "incorrect" | null;
    onResetFeedback : () => void;
}

const AnswerFeedback: React.FC<feedbackProps> = ({feedback, onResetFeedback}) => {
    const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    if (feedback) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onResetFeedback();
    }, 1000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  if (!feedback || !visible) return null;

    const isCorrect = feedback === "correct";
  return (
     <div
      style={{
        // position: "fixed",
        // top: "80%",
        // left: "50%",
        // transform: "translate(-50%, -50%)",
        margin: "auto 0",
        fontSize: "1.3rem",
        color: isCorrect ? "green" : "red",
        zIndex: 9999,
        pointerEvents: "none",
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem"
      }}
    >
      {isCorrect ? "✅ Correct! +3 Seg " : "❌ Incorrect"}
    </div>
  )
}

export default AnswerFeedback