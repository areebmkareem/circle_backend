let express = require("express");
let bodyParser = require("body-parser");

let { mongoose } = require("./db/mongoose");
let { Todo } = require("./modals/todo");
let { User } = require("./modals/user");

let app = express();

app.listen(3000, () => {
  console.log("Started On Port 3000");
});

//setting up route
app.use(bodyParser.json());
app.post("/todos", (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });
  todo.save().then(
    doc => {
      console.log("SAVED");
      res.send(doc);
    },
    err => {
      console.log("error");
      res.status(400).send(err);
    }
  );

  console.log(req.body);
});

app.get("/todos", (req, res) => {
  Todo.find().then(
    todos => {
      res.send({ todos });
    },
    err => {
      res.status(400).send(err);
    }
  );
});
