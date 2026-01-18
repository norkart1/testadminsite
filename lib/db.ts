import { ObjectId } from 'mongodb';
import { getUsersCollection, getSessionsCollection } from './mongodb';

export interface User {
  _id?: ObjectId;
  username: string;
  password: string;
  role: 'admin' | 'student';
  email: string;
  createdAt: Date;
}

export interface SessionData {
  _id?: ObjectId;
  sessionId: string;
  userId: string;
  role: 'admin' | 'student';
  username: string;
  createdAt: Date;
  expiresAt: Date;
}

export const db = {
  // User methods
  getUserByUsername: async (username: string): Promise<User | null> => {
    try {
      const usersCollection = await getUsersCollection();
      return await usersCollection.findOne({ username });
    } catch (error) {
      console.error('[v0] Error getting user by username:', error);
      return null;
    }
  },

  getUserById: async (id: string): Promise<User | null> => {
    try {
      const usersCollection = await getUsersCollection();
      const { ObjectId } = await import('mongodb');
      return await usersCollection.findOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.error('[v0] Error getting user by ID:', error);
      return null;
    }
  },

  createUser: async (
    username: string,
    password: string,
    email: string,
    role: 'admin' | 'student' = 'student'
  ): Promise<User | null> => {
    try {
      const usersCollection = await getUsersCollection();
      const newUser: User = {
        username,
        password,
        role,
        email,
        createdAt: new Date(),
      };
      const result = await usersCollection.insertOne(newUser);
      return { ...newUser, _id: result.insertedId };
    } catch (error) {
      console.error('[v0] Error creating user:', error);
      return null;
    }
  },

  // Session methods
  createSession: async (userId: string, expiresInHours: number = 24): Promise<string | null> => {
    try {
      const user = await db.getUserById(userId);
      if (!user) return null;

      const sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
      const sessionsCollection = await getSessionsCollection();
      
      const session: SessionData = {
        sessionId,
        userId,
        role: user.role,
        username: user.username,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + expiresInHours * 60 * 60 * 1000),
      };
      
      await sessionsCollection.insertOne(session);
      return sessionId;
    } catch (error) {
      console.error('[v0] Error creating session:', error);
      return null;
    }
  },

  getSession: async (sessionId: string): Promise<SessionData | null> => {
    try {
      const sessionsCollection = await getSessionsCollection();
      const session = await sessionsCollection.findOne({ sessionId });
      
      if (!session) return null;
      
      if (new Date() > session.expiresAt) {
        await sessionsCollection.deleteOne({ sessionId });
        return null;
      }
      
      return session;
    } catch (error) {
      console.error('[v0] Error getting session:', error);
      return null;
    }
  },

  deleteSession: async (sessionId: string): Promise<void> => {
    try {
      const sessionsCollection = await getSessionsCollection();
      await sessionsCollection.deleteOne({ sessionId });
    } catch (error) {
      console.error('[v0] Error deleting session:', error);
    }
  },

  getAllUsers: async (): Promise<User[]> => {
    try {
      const usersCollection = await getUsersCollection();
      return await usersCollection.find({}).toArray() as User[];
    } catch (error) {
      console.error('[v0] Error getting all users:', error);
      return [];
    }
  },

  getAllStudents: async (): Promise<User[]> => {
    try {
      const usersCollection = await getUsersCollection();
      return await usersCollection.find({ role: 'student' }).toArray() as User[];
    } catch (error) {
      console.error('[v0] Error getting all students:', error);
      return [];
    }
  },

  initializeDefaultAdmin: async (): Promise<void> => {
    try {
      const usersCollection = await getUsersCollection();
      const adminExists = await usersCollection.findOne({ username: 'admin' });
      
      if (!adminExists) {
        await usersCollection.insertOne({
          username: 'admin',
          password: '12345',
          role: 'admin',
          email: 'admin@jdsa.com',
          createdAt: new Date(),
        });
        console.log('[v0] Default admin user created');
      }
    } catch (error) {
      console.error('[v0] Error initializing default admin:', error);
    }
  },
};
