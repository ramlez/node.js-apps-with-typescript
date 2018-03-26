import { MongoClient, Db } from "mongodb";

class DbClient {

    public db: Db;

    public async connect(appName: string) {
        if (this.db === undefined ||
            (<any>this.db.serverConfig).isConnected() === false) {

            console.log("Connecting to database");
            
            const options = {
                appname: appName,
                reconnectTries: Number.MAX_VALUE,
                reconnectInterval: 500,
            };
            
            this.db = await MongoClient.connect("mongodb://localhost:27017/test", options);

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
}

export = new DbClient();
