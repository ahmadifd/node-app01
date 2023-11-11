import jalali from "jalali-moment";
import express from "express";

//console.log(jalali(new Date()).locale("fa").format("YYYY/MM/DD"));

const app = express();

app.get("/", (req, res) => {
  //res.send("Hello");
  console.log(req.query);
  res.send([
    { id: 1, name: "user1" },
    { id: 2, name: "user2" },
  ]);
});

app.get("/:id", (req, res) => {
  console.log(req.params);
  res.send({ id: req.params.id, name: `User${req.params.id}` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listen to ${PORT}`);
});
