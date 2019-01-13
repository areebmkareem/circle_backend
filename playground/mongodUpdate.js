const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  (err, db) => {
    if (err) {
      return console.log("[UNABLE TO CONNECT]");
    }
    console.log("[CONNECTED TO MONGODB]");
    //findOneAndUpdate
    db.collection("todoApp")
      .findOneAndUpdate(
        {
          _id: new ObjectID("5c3b486fed463e7d79fca3b5")
        },
        {
          $inc: {
            age: 1
          }
        },
        {
          returnOriginal: false
        }
      )
      .then(
        err => {
          console.log("[ERROR]", err);
        },
        result => {
          console.log("[RESUT]", result);
        }
      );

    db.close();
  }
);
