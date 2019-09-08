let express = require("express");
let bodyParser = require("body-parser");
const userRouter = require("../src/routers/user");
const Circle = require("./routers/circle");
const circleRouter = Circle.router;
let becrypt = require("bcryptjs");
let { mongoose } = require("./db/mongoose");
let { Todo } = require("./modals/todo");
let { Users } = require("./modals/user");
const cors = require("cors");
const port = process.env.PORT;

const app = express();

//setting up route
app.use(cors());
app.use(bodyParser.json());
app.use(userRouter);
app.use(circleRouter);

app.listen(port, () => {
  console.log(`Started On Port ${port}`);
});
