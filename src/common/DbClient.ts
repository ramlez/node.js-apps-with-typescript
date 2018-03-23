import { MongoClient, Db } from "mongodb";

class DbClient {

    public db: Db;

    public async connect() {
        if (this.db === undefined ||
            (<any>this.db.serverConfig).isConnected() === false) {

            console.log("Connecting to database");
            this.db = await MongoClient.connect("mongodb://localhost:27017/test", {
                reconnectTries: Number.MAX_VALUE, // try reconnect as long as it's possible  (default: 30),
                reconnectInterval: 500, // retry every 0.5 second (default value is 1000 ms - 1 sec)
            });

            this.db.on("close", () => console.log(`CLOSE event on db: ${this.db.databaseName}`));
            this.db.on("reconnect", () => console.log(`RECONNECT event on db: ${this.db.databaseName}`));
            this.db.on("timeout", () => console.log(`TIMEOUT event on db: ${this.db.databaseName}`));
            this.db.on("error", () => console.log(`ERROR event on db: ${this.db.databaseName}`));
            this.db.on("timeout", () => console.log(`TIMEOUT event on db: ${this.db.databaseName}`));
        } else {
            console.log(`Already connected to database: ${this.db.databaseName}`);
        }

        return this.db;
    }

    public async connect2() {
        // async / await approach:


        // -------------------------------------------------
        // Promises approach:
        // -------------------------------------------------

        // return MongoClient.connect("mongodb://localhost:27017/test")
        //     .then(db => {
        //         this.db = db;
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });

        // -------------------------------------------------
        // Callback approach:
        // -------------------------------------------------


        //     MongoClient.connect("mongodb://localhost:27017/test", (err, db) => {
        //         if(err) {
        //             console.log(err);
        //         } else {
        //             this.db = db;
        //         } 
        //     });
        // }
    }
}

export = new DbClient();
