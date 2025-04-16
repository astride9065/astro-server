const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/scrape", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();
    await page.goto("https://1win.com.ci/casino/play/100hp_100hpgaming_astronaut", {
      waitUntil: "networkidle2",
    });

    // Ici tu adaptes pour récupérer les cotes visibles
    const data = await page.evaluate(() => {
      // Simuler des valeurs ici en attendant l'analyse réelle
      return {
        lastMultipliers: [1.4, 2.5, 3.1, 1.9, 0.8],
        trend: "up"
      };
    });

    await browser.close();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors du scraping" });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur actif sur le port ${PORT}`);
});
