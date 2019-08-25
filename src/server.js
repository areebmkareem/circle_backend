let express = require("express");
let bodyParser = require("body-parser");
const path = require("path");
const userRouter = require("../src/routers/user");
const Circle = require("./routers/circle");
const circleRouter = Circle.router;
let becrypt = require("bcryptjs");
let { mongoose } = require("./db/mongoose");
let { Todo } = require("./modals/todo");
let { Users } = require("./modals/user");
const cors = require("cors");
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);

//setting up route
app.use(cors());
app.use(bodyParser.json());
app.use(userRouter);
app.use(circleRouter);
app.use(express.static(publicDirectoryPath));

server.listen(port, () => {
  console.log(`Started On Port ${port}`);
});

io.on("connection", () => console.log("websocket"));
