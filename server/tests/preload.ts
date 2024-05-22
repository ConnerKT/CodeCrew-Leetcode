import { mock } from 'bun:test';
import Redis from 'ioredis-mock';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { sampleGameState, sampleChallenges } from './sampledata';
import { MongoClient } from 'mongodb';
import { Challenge } from '../src/models';


mock.module('../src/config/redisConfig', () => {
  const redis: any = new Redis({
    data: {
      'sess:adyd876gdga': JSON.stringify({ username: 'testuser', gameroomId: '1234' }),
      [`room:${sampleGameState.id}`]: JSON.stringify(sampleGameState)
    }
  });

  // Mock the call method on the redis instance.
  redis.call = mock((command, key, path, value) => {
    if (command === 'JSON.GET') {
      return redis.get(key);
    }
    if (command === 'JSON.SET') {
      return redis.set(key, value);
    }

    if (command === 'JSON.ARRAPPEND') {
      const data = JSON.parse(redis.get(key));
      data[path].push(value);
      return redis.set(key, JSON.stringify(data));
    }
    if (command === 'JSON.STRAPPEND') {
      const data = JSON.parse(redis.get(key));
      data[path].push(value);
      return redis.set(key, JSON.stringify(data));
    }
    if (command === 'JSON.ARRINDEX') {
      const data = JSON.parse(redis.get(key));
      return data[path].indexOf(value);
    }

    if (command === 'EXISTS') {
      return redis.exists(key);
    }
  });

  redis.once = mock((event, callback) => {
    if (event === 'connect') {
      callback();
    }
  });

  redis.config = mock((command, key, value) => {
    if (command === 'SET') {
      return redis.set(key, value);
    }
  });

  return { default: redis };
});



mock.module('../src/config/mongoConfig', async () => {
  let mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  let client = new MongoClient(uri);
  await client.connect();

  //add test data
  client.db("leetcode").collection<Challenge>('challenges').insertMany(sampleChallenges);

  return {
    default: client
  }
});