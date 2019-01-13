const MongoClient = require("mongodb").MongoClient;

MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  (err, db) => {
    if (err) {
      return console.log("[UNABLE TO CONNECT]");
    }
    console.log("[CONNECTED TO MONGODB]");

    db.collection("todoApp")
      .findOneAndDelete({ completed: false })
      .then(
        resp => {
          console.log("[FOUND]", resp.value);
        },
        err => {
          console.log("[ERROR]", err);
        }
      );

    // db.close();
  }
);
