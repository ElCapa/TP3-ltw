import React from "react";
import { Shark } from "../types/shark";

interface SharkCardProps {
  shark: Shark;
  onClick: () => void;
  selected?: boolean;
}

const SharkCard: React.FC<SharkCardProps> = ({ shark, onClick, selected }) => {
  // Verifica se shark.image e shark.image.src existem
  const imageSrc = shark.image?.src ? `http://localhost:4000/${shark.image.src}` : "";
  const imageAlt = shark.image?.alt || "Imagem do tubarão";

  return (
    <div
      onClick={onClick}
      className={`border rounded-lg p-2 text-center cursor-pointer ${
        selected ? "border-blue-500 shadow-lg" : "border-transparent"
      } hover:shadow-md transition`}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full rounded-md"
        />
      ) : (
        <div className="w-full h-32 bg-gray-200 rounded-md flex items-center justify-center">
          <span className="text-gray-500">Imagem não disponível</span>
        </div>
      )}
      <p className="mt-2 font-medium text-sm">{shark.title}</p>
    </div>
  );
};

export default SharkCard;