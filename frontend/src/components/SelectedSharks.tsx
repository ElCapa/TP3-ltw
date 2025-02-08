
import React, { useState } from "react";
import { Shark } from "../types/shark";
import SharkCard from "./SharkCard";
import "../App.css";
import DeleteConfirmation from "./DeleteConfirmation";

interface SelectedSharksProps {
  sharks: Shark[];
  onRemove: (shark: Shark) => void;
}

const SelectedSharks: React.FC<SelectedSharksProps> = ({ sharks, onRemove }) => {
  const [sharkToDelete, setSharkToDelete] = useState<Shark | null>(null);
  return (
    <div>
      {sharks.length === 0 ? (
        <p className="text-center text-accent italic">
          Nenhum tubarão selecionado no momento.
        </p>
      ) : (
        <div className="flex gap-4 flex-wrap justify-center">
          {sharks.map((shark) => (
            <SharkCard
              key={shark.id}
              shark={shark}
              onClick={() => onRemove(shark)}
              selected
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectedSharks;
