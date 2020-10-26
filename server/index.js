import express from "express";
import { readFileSync } from "fs";

const app = new express();

app.use(express.static("dist"));

app.get("/", async (_req, res) => {
  //   res.send(`<H1>React</H1>`);
  const index = readFileSync("public/index.html", "utf-8");
  res.send(index);
});

app.listen(2000);
console.log("server is listening");
