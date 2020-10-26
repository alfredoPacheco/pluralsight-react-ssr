import React from "react";
import express from "express";
import { readFileSync } from "fs";
import { renderToString } from "react-dom/server";

import { App } from "../client/App";
import { handleModifyAnswerVotes } from "../shared/utility";

const data = {
  questions: [
    {
      questionId: "Q1",
      content: "Should we use jQuery or Fetch for Ajax?",
    },
    {
      questionId: "Q2",
      content: "Should we use jQuery or Fetch for Ajax?",
    },
  ],
  answers: [
    {
      answerId: "A1",
      questionId: "Q1",
      upvotes: 2,
      content: "jQuery",
    },
    {
      answerId: "A2",
      questionId: "Q1",
      upvotes: 2,
      content: "jQuery",
    },
    {
      answerId: "A3",
      questionId: "Q2",
      upvotes: 2,
      content: "jQuery",
    },
    {
      answerId: "A4",
      questionId: "Q3",
      upvotes: 2,
      content: "jQuery",
    },
  ],
};

const app = new express();

app.use(express.static("dist"));

app.get("/vote/:answerId", (req, res) => {
  const { query, params } = req;
  data.answers = handleModifyAnswerVotes(
    data.answers,
    params.answerId,
    +query.increment
  );
  res.send("OK");
});

app.get("/data", async (_req, res) => {
  res.json(data);
});

app.get("/", async (_req, res) => {
  //   res.send(`<H1>React</H1>`);
  const index = readFileSync("public/index.html", "utf-8");
  const rendered = renderToString(<App {...data} />);

  res.send(index.replace("{{rendered}}", rendered));
});

app.listen(2000);
console.log("server is listening");
