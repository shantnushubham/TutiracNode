const { MongoClient, ObjectId } = require("mongodb");

const url =
  "mongodb+srv://root:roota@tutoraccluster.udjbnbd.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url, { useNewUrlParser: true });

const dbName = "sample_mflix";

client.connect().then(() => {
  console.log("Connection was successful.");
  const db = client.db(dbName);
  // db.collection("users")
  //   .insertMany([
  //     {
  //       name: "Neha Singh",
  //       email: "neha_singh@gameofthrones.com",
  //       password: "1234",
  //     },
  //     {
  //       name: "Priya Sinha",
  //       email: "priya_sinha@gameofthrones.com",
  //       password: "9876",
  //     },
  //   ])
  //   .then((insertResult) => console.log("Insert Success.", insertResult))
  //   .catch((err) => console.error(err));
  // db.collection("users")
  //   .find({ name: new RegExp("^R") })
  //   .toArray()
  //   .then((data) => {
  //     console.log(data.length);
  //   });
  //   db.collection("users")
  //     .updateMany(
  //       { name: /^R/ },
  //       {
  //         $set: {
  //           modified: true,
  //         },
  //       }
  //     )
  //     .then((updateResult) => {
  //       console.log(updateResult);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // })
  // .catch((error) => {
  //   console.error(error);
  // });

  db.collection("users")
    .deleteMany({
      name: {
        $in: ["Neha Singh", "Priya Sinha"],
      },
    })
    .then((deleteResult) => console.log(deleteResult))
    .catch((error) => console.error(error))
    .finally(() => client.close());
});
