const appConfig = require('./appConfig');
const {MongoClient} = require('mongodb');

const mongo = new MongoClient(appConfig.MONGO_CONNECTION_STRING)

module.exports = mongo;