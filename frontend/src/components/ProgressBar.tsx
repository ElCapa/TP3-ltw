import React, { useEffect, useState } from "react";

interface ProgressBarProps {
  timer: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ timer }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.max(prev - 1, 0)); // Reduz a progressão a cada intervalo
    }, timer / 100); // Divide o tempo total em 100 intervalos

    return () => {
      clearInterval(interval); // Limpa o intervalo ao desmontar
    };
  }, [timer]);

  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
      <div
        className="bg-red-500 h-2 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;