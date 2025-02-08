import React, { useEffect, useState } from "react";
import { getSharks } from "./services/api";
import { Shark } from "./types/shark";
import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SharkPicker from "./pages/SharkPicker";
import AdminSharks from "./pages/AdminSharks";
import NewShark from "./pages/NewShark";
import Navigation from "./components/Navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const App: React.FC = () => {
  const [sharks, setSharks] = useState<Shark[]>([]);
  const [selectedSharks, setSelectedSharks] = useState<Shark[]>([]);

  useEffect(() => {
    const fetchSharks = async () => {
      const sharksData = await getSharks();
      setSharks(sharksData);
    };

    fetchSharks();
  }, []);

  const handleSharkClick = (shark: Shark) => {
    setSelectedSharks((prev) =>
      prev.some((s) => s.id === shark.id)
        ? prev.filter((s) => s.id !== shark.id)
        : [...prev, shark]
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<SharkPicker />} />
          <Route path="/admin/sharks" element={<AdminSharks />} />
          <Route path="/admin/sharks/novo" element={<NewShark />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
