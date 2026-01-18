import { MongoClient, Db } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error(
      'Please define the MONGODB_URI environment variable'
    );
  }

  try {
    const client = new MongoClient(mongoUri);
    await client.connect();

    const db = client.db('jdsa_students_bank');

    cachedClient = client;
    cachedDb = db;

    console.log('[v0] Connected to MongoDB');
    return { client, db };
  } catch (error) {
    console.error('[v0] MongoDB connection error:', error);
    throw error;
  }
}

export async function getDatabase() {
  const { db } = await connectToDatabase();
  return db;
}

export async function getUsersCollection() {
  const db = await getDatabase();
  return db.collection('users');
}

export async function getSessionsCollection() {
  const db = await getDatabase();
  return db.collection('sessions');
}
