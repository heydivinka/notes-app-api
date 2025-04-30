const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.get("/api/notes", async (req, res) => {
    try {
        const response = await axios.get("https://notes-api.dicoding.dev/v2/notes");
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengambil data" });
    }
});

app.listen(3000, () => console.log("Proxy berjalan di http://localhost:3000"));
