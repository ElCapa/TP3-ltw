import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

const NewShark: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    imageSrc: "",
    imageAlt: "",
    lat: "",
    lon: "",
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Envia os dados para o backend
      await axios.post("http://localhost:4000/admin/sharks/novo", formData);

      // Exibe uma mensagem de sucesso
      alert("Tubarão adicionado com sucesso!");

      // Atualiza a lista de tubarões no cache do React Query
      queryClient.invalidateQueries({ queryKey: ["sharks"] }); // Corrigido aqui

      // Redireciona para a lista de tubarões
      navigate("/admin/sharks");
    } catch (error) {
      console.error("Erro ao adicionar tubarão:", error);
      alert("Erro ao adicionar tubarão.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Registrar Novo Tubarão</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Título</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block">URL da Imagem</label>
          <input
            type="text"
            name="imageSrc"
            value={formData.imageSrc}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block">Descrição da Imagem</label>
          <input
            type="text"
            name="imageAlt"
            value={formData.imageAlt}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block">Latitude</label>
          <input
            type="text"
            name="lat"
            value={formData.lat}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block">Longitude</label>
          <input
            type="text"
            name="lon"
            value={formData.lon}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default NewShark;