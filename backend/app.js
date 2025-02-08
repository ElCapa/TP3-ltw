import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(express.static("images"));
app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // todos os dominios
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get("/sharks", async (req, res) => {
  const fileContent = await fs.readFile("./data/sharks.json");

  const sharksData = JSON.parse(fileContent);

  res.status(200).json({ sharks: sharksData });
});

app.get("/user-sharks", async (req, res) => {
  const fileContent = await fs.readFile("./data/user-sharks.json");

  const sharks = JSON.parse(fileContent);

  res.status(200).json({ sharks });
});

app.put("/user-sharks", async (req, res) => {
  const sharks = req.body.sharks;

  await fs.writeFile("./data/user-sharks.json", JSON.stringify(sharks));

  res.status(200).json({ message: "User sharks updated!" });
});

app.post("/admin/sharks/novo", async (req, res) => {
  const newShark = req.body;

  try {
    // Lê o arquivo sharks.json
    const fileContent = await fs.readFile("./data/sharks.json", "utf-8");
    const sharks = JSON.parse(fileContent);

    // Adiciona o novo tubarão à lista
    sharks.push({ id: `p${sharks.length + 1}`, ...newShark });

    // Salva a lista atualizada no arquivo
    await fs.writeFile("./data/sharks.json", JSON.stringify(sharks));

    res.status(201).json({ message: "Tubarão adicionado com sucesso!" });
  } catch (error) {
    console.error("Erro ao adicionar tubarão:", error);
    res.status(500).json({ message: "Erro ao adicionar tubarão." });
  }
});

// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`"Servidor rodando em http://localhost:${PORT}/"`);
});
