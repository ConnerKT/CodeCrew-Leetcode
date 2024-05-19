import { MongoClient, ObjectId } from 'mongodb';
import { Challenge } from '../models'; // Ensuring the import paths are correct
import mongo from '../config/mongoConfig'; // Ensuring mongo configuration is correctly imported

class ChallengeStore {
    private mongoClient: MongoClient;

    constructor(mongoClient: MongoClient) {
        this.mongoClient = mongoClient;
    }

    async getAllChallenges(): Promise<Challenge[]> {
        const response = await this.mongoClient
                            .db("leetcode")
                            .collection<Challenge>("challenges")
                            .find({})
                            .toArray();
        return response;
    }

    async getChallengesByIds(ids: string[]): Promise<Challenge[]> {
        const objectIds = ids.map(id => new ObjectId(id));
        const response = await this.mongoClient
                            .db("leetcode")
                            .collection<Challenge>("challenges")
                            .find({ _id: { $in: objectIds } as unknown as { _id: ObjectId[] } }) //to fix type error
                            .toArray();
        return response;
    }

    async deleteChallengeById(id: string): Promise<{ deletedCount: number }> {
        const response = await this.mongoClient
                            .db("leetcode")
                            .collection("challenges")
                            .deleteOne({ _id: new ObjectId(id) });
        return { deletedCount: response.deletedCount };
    }

    async updateChallengeById(id: string, updateData: Partial<Challenge>): Promise<Challenge | null> {
        const response = await this.mongoClient
                            .db("leetcode")
                            .collection("challenges")
                            .findOneAndUpdate(
                                { _id: new ObjectId(id) },
                                { $set: updateData },
                                { returnDocument: 'after' }
                            );
        return response.value;
    }
}

const challengeStore = new ChallengeStore(mongo);
export default challengeStore;
