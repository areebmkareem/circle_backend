const MongoClient = require("mongodb").MongoClient;

MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  (err, db) => {
    if (err) {
      return console.log("[UNABLE TO CONNECT]");
    }
    console.log("[CONNECTED TO MONGODB]");

    db.collection("todoApp").insertOne(
      {
        text: "i'm dope",
        completed: true
      },
      (err, result) => {
        if (err) {
          return console.log("[UNABLE TO INSERT]");
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
      }
    );

    db.close();
  }
);
