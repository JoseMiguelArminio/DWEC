require("dotenv").config();

const express = require("express");
const conectarDB = require("./config/db");

const app = express();

conectarDB();

app.use(express.json());

app.use("/api/autores", require("./routes/autores"));
app.use("/api/libros", require("./routes/libros"));

app.get("/", (req, res) => {
    res.send("API funcionando correctamente");
});

app.use((req, res) => {
    res.status(404).json({ msg: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});