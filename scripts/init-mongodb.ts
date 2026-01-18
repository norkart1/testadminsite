import { MongoClient } from 'mongodb';

async function initializeMongoDB() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.error('ERROR: MONGODB_URI environment variable is not set');
    process.exit(1);
  }

  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    console.log('✓ Connected to MongoDB');

    const db = client.db('jdsa_students_bank');

    // Create collections if they don't exist
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    if (!collectionNames.includes('users')) {
      await db.createCollection('users');
      console.log('✓ Created users collection');
    }

    if (!collectionNames.includes('sessions')) {
      await db.createCollection('sessions');
      console.log('✓ Created sessions collection');
    }

    // Create indexes
    const usersCollection = db.collection('users');
    await usersCollection.createIndex({ username: 1 }, { unique: true });
    console.log('✓ Created username index');

    const sessionsCollection = db.collection('sessions');
    await sessionsCollection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
    console.log('✓ Created TTL index for sessions');

    // Insert default admin user if it doesn't exist
    const adminExists = await usersCollection.findOne({ username: 'admin' });
    if (!adminExists) {
      await usersCollection.insertOne({
        username: 'admin',
        password: '12345',
        role: 'admin',
        email: 'admin@jdsa.com',
        createdAt: new Date(),
      });
      console.log('✓ Created default admin user (username: admin, password: 12345)');
    } else {
      console.log('✓ Admin user already exists');
    }

    console.log('\n✅ MongoDB initialization completed successfully!');
  } catch (error) {
    console.error('✗ Error initializing MongoDB:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

initializeMongoDB();
