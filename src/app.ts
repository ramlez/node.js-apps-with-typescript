import DbClient = require("./common/DbClient");

class App {
    public async start() {
        console.log("Starting application...2 + 1");

        try {
            let db = await DbClient.connect();

            let results = await db.collection("todo").insertOne({
                topic: "learn angular.js", progress: 10
            });

            console.log(results.insertedId);

            let results2 = await db.collection("todo").insertMany([
                {  topic: "learn typescript", progress: 10 },
                {  topic: "learn node.js", progress: 10 }
            ]);

            console.log(results2.insertedIds);

            let docs = await db.collection("todo").find().toArray();

            console.log(docs);
            
            
        } catch (error) {
            console.log("Unable to connect to db");
            
        }
    }
}

const app = new App();
app.start();
