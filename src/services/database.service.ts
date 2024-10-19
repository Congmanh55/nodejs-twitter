import { Collection, Db, MongoClient } from 'mongodb'
import { config } from 'dotenv'
import User from '~/models/schemas/User.schema';
config()
console.log(process.env.DB_USERNAME, process.env.DB_PASSWORD)
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@see-m-1.v7e0u.mongodb.net/?retryWrites=true&w=majority&appName=See-M-1`;

class DatabaseService {
    private client: MongoClient;
    private db: Db;

    constructor() {
        this.client = new MongoClient(uri);
        this.db = this.client.db(process.env.DB_NAME);
    }
    async connect() {
        try {
            // Send a ping to confirm a successful connection
            await this.db.command({ ping: 1 })
            console.log('Pinged your deployment. You successfully connected to MongoDB!')
        } catch (error) {
            console.log('Error connecting to MongoDB:', error)
            throw error;
        }
    }

    get users(): Collection<User> {
        return this.db.collection(process.env.USER_COLLECTION as string);
    }
}

//Tao object tu class DatabaseService
const databaseService = new DatabaseService()
export default databaseService
