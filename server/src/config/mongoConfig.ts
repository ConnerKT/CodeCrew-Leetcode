import appConfig from './appConfig';
import { MongoClient } from 'mongodb';
const mongo = new MongoClient(appConfig.MONGO_CONNECTION_STRING)

export default mongo;