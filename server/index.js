import React from "react";
import express from "express";
import { readFileSync } from "fs";
import { renderToString } from "react-dom/server";

import { App } from "../client/App";

const app = new express();

app.use(express.static("dist"));

app.get("/", async (_req, res) => {
  //   res.send(`<H1>React</H1>`);
  const index = readFileSync("public/index.html", "utf-8");
  const rendered = renderToString(<App />);

  res.send(index.replace("{{rendered}}", rendered));
});

app.listen(2000);
console.log("server is listening");
