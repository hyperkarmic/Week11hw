const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
  <html>
    <div>Hi Everyone</div>
  </html>
  `);
});

app.listen(PORT);
