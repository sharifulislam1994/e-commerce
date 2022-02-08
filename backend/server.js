import express from "express";
import data from "./data.js";
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/product", function (req, res) {
  res.send(data);
});

app.get("/product/:slug", function (req, res) {
  // res.send("ami daynamic");
  // console.log(req.params.slug);
  let product = data.find((item) => {
    if (req.params.slug === item.slug) {
      return true;
    }
  });
  res.send(product);
});

let port = process.env.PORT || 8000;
app.listen(8000, () => {
  console.log("listening on 8000");
});
