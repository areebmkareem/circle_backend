const MongoClient = require("mongodb").MongoClient;

MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  (err, db) => {
    if (err) {
      return console.log("[UNABLE TO CONNECT]");
    }
    console.log("[CONNECTED TO MONGODB]");

    db.collection("todoApp")
      .find({ _id: "" })
      .toArray()
      .then(
        docs => {
          console.log(JSON.stringify(docs, undefined, 2));
        },
        err => {
          console.log("[ERROR]", err);
        }
      );

    // db.close();
  }
);
