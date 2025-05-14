
const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Example App",
    cssFiles: [
      "/css/nav.css",
      "/css/common.css",
      "/css/footer.css",
  
    ]
  });
});

app.get("/:color", (req, res) => {
  const color = req.params.color.toLowerCase();
  if (!["blue", "red", "green"].includes(color)) {
    return res.status(404).send("Page not found");
  }
  res.render("color", {
    title: `${color.charAt(0).toUpperCase() + color.slice(1)} Pages`,
    color,
    cssFiles: [
      "/css/nav.css",
      "/css/common.css",
      "/css/footer.css",
      `/css/${color}.css`,
      `/css/${color}-index.css`
    ]
  });
});

app.get("/:color/:size", (req, res) => {
  const color = req.params.color.toLowerCase();
  const size = req.params.size;
  const validColors = ["blue", "red", "green"];
  const validSizes = ["20", "30", "40"];
  if (!validColors.includes(color) || !validSizes.includes(size)) {
    return res.status(404).send("Page not found");
  }
  res.render("color-size", {
    title: `${color.charAt(0).toUpperCase() + color.slice(1)} Page - ${size}px`,
    color,
    size,
    cssFiles: [
      "/css/nav.css",
      "/css/common.css",
      "/css/footer.css",
      `/css/${color}.css`,
      `/css/font${size}.css`,
      "/css/button.css"
    ],
    jsFiles: [`/js/${color}.js`]
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
