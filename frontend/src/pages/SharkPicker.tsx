import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getSharks } from "../services/api";
import { Shark } from "../types/shark";
import SharkList from "../components/SharkList";
import SelectedSharks from "../components/SelectedSharks";
import logo from "../assets/logo.png";

const SharkPicker: React.FC = () => {
  const [selectedSharks, setSelectedSharks] = React.useState<Shark[]>([]);

  // Usando React Query para buscar os tubarões
  const {
    data: sharks,
    isLoading,
    isError,
  } = useQuery<Shark[], Error>({
    queryKey: ["sharks"], // Chave única para a query
    queryFn: getSharks, // Função que busca os dados
  });

  const handleSharkClick = (shark: Shark) => {
    setSelectedSharks((prev) =>
      prev.some((s) => s.id === shark.id)
        ? prev.filter((s) => s.id !== shark.id)
        : [...prev, shark]
    );
  };

  if (isLoading) {
    return <div>Carregando tubarões...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar os tubarões.</div>;
  }

  return (
    <div className="bg-primary text-secondary min-h-screen p-8">
      <header className="text-center">
        <img className="mx-auto w-4 h-4" src={logo} alt="" style={{ width: "4rem", height: "4rem", margin: "1rem auto" }}  />
        <h1 className="text-4xl font-bold tracking-wide">SHARK PICKER</h1>
        <p className="text-lg mt-2 text-accent">
          Criar sua coleção pessoal de tubarões que já viu ou gostaria de ver
          nos mares de Cabo Verde
        </p>
      </header>

      <main className="mt-8">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-accent">
            Eu gostaria de ver...
          </h2>
          <div className="mt-4 border border-accent rounded-lg p-4 bg-primary-light">
            <SelectedSharks
              sharks={selectedSharks}
              onRemove={handleSharkClick}
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-accent">
            Tubarões existentes
          </h2>
          <div className="mt-4">
            {sharks && (
              <SharkList
                sharks={sharks}
                onSharkClick={handleSharkClick}
                selectedSharks={selectedSharks}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SharkPicker;