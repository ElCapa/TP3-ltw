import React from "react";
import { Shark } from "../types/shark";
import SharkCard from "./SharkCard";

interface SharkListProps {
  sharks: Shark[];
  onSharkClick: (shark: Shark) => void;
  selectedSharks: Shark[];
}

const SharkList: React.FC<SharkListProps> = ({
  sharks,
  onSharkClick,
  selectedSharks,
}) => {
  return (
    <div className="flex flex-wrap gap-4">
      {sharks.map((shark) => (
        <div key={shark.id} className="flex-1 min-w-[200px] max-w-[300px]">
          <SharkCard
            shark={shark}
            onClick={() => onSharkClick(shark)}
            selected={selectedSharks.some((s) => s.id === shark.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default SharkList;