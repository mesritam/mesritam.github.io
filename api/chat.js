
   const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const API_KEY = "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";

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: userMessage })
      }
    );

    const data = await response.json();

    res.json({
      reply: data.generated_text || "No reply"
    });

  } catch (error) {
    res.json({ reply: "Error occurred" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
