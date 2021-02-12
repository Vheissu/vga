import BigNumber from 'bignumber.js';

import { MongoClient, Db } from 'mongodb';

export class Database {
    private client: MongoClient;
    private db: Db;

    private mongo = {
        uri: '',
        database: '',
        options: {}
    };

    constructor(uri: string, database: string, options = { useNewUrlParser: true,  useUnifiedTopology: true }) {
        this.mongo.uri = uri;
        this.mongo.database = database;
        this.mongo.options = options;

        this.connect();
    }

    public async connect() {
        this.client = await MongoClient.connect(this.mongo.uri, this.mongo.options);
        this.db = this.client.db(this.mongo.database);

        const chainCollection = await this.db.collection('chain');

        if (!chainCollection) {
            await this.db.createCollection('chain');
            await this.db.createCollection('balances');
            await this.db.createCollection('markets');
        }
    }

    public get instance() {
        return this.db;
    }
}