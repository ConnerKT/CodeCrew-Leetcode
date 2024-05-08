// models/problem.js
const mongo = require('../config/mongoConfig');
const { ObjectId } = require('mongodb');




class ChallengeStore {
    constructor(mongoClient) {
        this.mongoClient = mongoClient.db("leetcode").collection("challenges")
    }

    async getAllChallenges() {
        return await this.mongoClient.find({}).toArray();
    }

    async getChallengesByIds(ids) {
        const objectIds = ids.map(id => new ObjectId(id));
        return await this.mongoClient.find({ _id: { $in: objectIds } }).toArray();
    }

    async deleteChallengeById(id) {
        return await this.mongoClient.deleteOne({ _id: id });
    }

    async updateChallengeById(id, updateData) {
        return await this.mongoClient.findOneAndUpdate(
            { _id: id },
            { $set: updateData },
            { returnDocument: 'after' }
        );
    }
}

const challengeStore = new ChallengeStore(mongo);
module.exports = challengeStore;
