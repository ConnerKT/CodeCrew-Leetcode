import appConfig from './appConfig';
import { MongoClient } from 'mongodb';
console.log("appConfig.MONGO_CONNECTION_STRING", appConfig.MONGO_CONNECTION_STRING)
const mongo = new MongoClient(appConfig.MONGO_CONNECTION_STRING)

export default mongo;