// models/problem.js
import { MongoClient } from 'mongodb';
import mongo from '../config/mongoConfig';
const { ObjectId } = require('mongodb');




class ChallengeStore {
    mongoClient: MongoClient
    constructor(mongoClient) {
        this.mongoClient = mongoClient
    }

    async getAllChallenges() {
        return await this.mongoClient
                        .db("leetcode")
                        .collection("challenges")
                        .find({}).toArray();
    }

    async getChallengesByIds(ids) {
        const objectIds = ids.map(id => new ObjectId(id));
        return await this.mongoClient
                            .db("leetcode")
                            .collection("challenges")
                            .find({ _id: { $in: objectIds } }).toArray();
    }

    async deleteChallengeById(id) {
        return await this.mongoClient.db("leetcode").collection("challenges").deleteOne({ _id: id });
    }

    async updateChallengeById(id, updateData) {
        return await this.mongoClient.db("leetcode").collection("challenges").findOneAndUpdate(
            { _id: id },
            { $set: updateData },
            { returnDocument: 'after' }
        );
    }
}

const challengeStore = new ChallengeStore(mongo);
export default challengeStore;
