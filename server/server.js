let express = require("express");
let bodyParser = require("body-parser");

let { mongoose } = require("./db/mongoose");
let { Todo } = require("./modals/todo");
let { User } = require("./modals/user");

const port = process.env.PORT || 3000;

let app = express();

app.listen(port, () => {
  console.log(`Started On Port ${port}`);
});

//setting up route
app.use(bodyParser.json());
console.log(__dirname, __filename);

app.post("/todos", (req, res) => {
  let todo = new Todo({
    text: req.body.text,
    createdAt: new Date()
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

app.get("/todo/:id", (req, res) => {
  console.log(req.params);
  Todo.findById(req.params.id).then(
    response => {
      res.send(response);
    },
    err => {
      res.status(400).send({ error: true });
    }
  );
});

app.post("/todo-delete", (req, res) => {
  let todoId = req.body.todoId;
  Todo.findByIdAndDelete(todoId).then(
    () => {
      res.send({ success: true });
    },
    err => {
      console.log("ERROR");
      res.send({ error: true });
    }
  );
});

app.post("/update/:id", (req, res) => {
  console.log("[UPDATE]", req.params, req.body);
  let toUpdateText = req.body.text;
  Todo.updateOne({ _id: req.params.id, text: toUpdateText }).then(
    () => {
      res.send({ success: true });
    },
    err => {
      res.send({ error: tru });
    }
  );
});
