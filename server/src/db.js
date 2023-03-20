import { MongoClient } from "mongodb";
import dotenv from "dotenv";

let db;


async function connectToDB(cb) {
    const user = process.env.MONGO_USER;
    const password = process.env.MONGO_PASSWORD; 
    const uri1 = `mongodb+srv://${user}:${password}@cluster0.xrarw.mongodb.net/?retryWrites=true&w=majority`;
    const uri = `mongodb+srv://todo_user:6i3fP9WYLNCpTefX@cluster0.xrarw.mongodb.net/?retryWrites=true&w=majority`;

    console.log(uri1);
  const client = new MongoClient(uri1);
  await client.connect();
  // console.log(`Name is ${req.params.name}`);

  db = client.db("voicegpt");

   cb();
}

export {
     db,
     connectToDB,
    };
