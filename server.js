require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const shortid = require("shortid");

const Url = require("./models/Url");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("Mongo error:", err));


// Home page
app.get("/", async (req, res) => {
  const urls = await Url.find();
  res.render("index", { urls });
});

// Create short URL
app.post("/", async (req, res) => {
  const fullUrl = req.body.Fullurl;
  let customShort = req.body.customShort;

  if (customShort) {
    customShort = customShort.trim();

    const regex = /^[a-zA-Z0-9_-]+$/;
    if (!regex.test(customShort)) {
      return res.send("❌ Invalid custom URL name");
    }

    const exists = await Url.findOne({ short: customShort });
    if (exists) {
      return res.send("❌ Custom URL already in use");
    }
  } else {
    customShort = shortid.generate();
  }

  await Url.create({
    full: fullUrl,
    short: customShort
  });

  res.redirect("/");
});

// Redirect
app.get("/:shortUrl", async (req, res) => {
  const url = await Url.findOne({ short: req.params.shortUrl });
  if (!url) return res.send("URL not found");

  url.clicks++;
  await url.save();

  res.redirect(url.full);
});

// Start server (Render compatible)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
