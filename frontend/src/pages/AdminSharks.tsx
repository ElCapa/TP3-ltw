import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Shark } from "../types/shark";

const AdminSharks: React.FC = () => {
  const {
    data: sharks,
    isLoading,
    isError,
  } = useQuery<Shark[], Error>({
    queryKey: ["sharks"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:4000/sharks");
      return response.data.sharks;
    },
  });

  if (isLoading) {
    return <div>Carregando tubarões...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar os tubarões.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Lista de Tubarões</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Título</th>
            <th className="border p-2">Imagem</th>
            <th className="border p-2">Latitude</th>
            <th className="border p-2">Longitude</th>
          </tr>
        </thead>
        <tbody>
          {sharks?.map((shark) => {
            // Verifica se shark.image e shark.image.src existem
            const imageSrc = shark.image?.src
              ? `http://localhost:4000/${shark.image.src}`
              : "";
            const imageAlt = shark.image?.alt || "Imagem do tubarão";

            return (
              <tr key={shark.id} className="hover:bg-gray-100">
                <td className="border p-2">{shark.title}</td>
                <td className="border p-2">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={imageAlt}
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-xs">Sem imagem</span>
                    </div>
                  )}
                </td>
                <td className="border p-2">{shark.lat}</td>
                <td className="border p-2">{shark.lon}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSharks;
