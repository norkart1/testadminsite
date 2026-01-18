# JDSA Students Bank - MongoDB Setup Guide

## Overview
This project uses MongoDB Atlas for data persistence. Follow these steps to set up the database connection.

## Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or sign in
3. Create a new project (or use the default one)
4. Create a cluster (select M0 Sandbox for free tier)

## Step 2: Get Connection String
1. In MongoDB Atlas, click "Connect" on your cluster
2. Select "Drivers" option
3. Copy the connection string (MongoDB URI)
4. It should look like: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`

## Step 3: Set Environment Variable
1. In the v0 chat sidebar, go to **Vars**
2. Add a new environment variable:
   - **Key**: `MONGODB_URI`
   - **Value**: Paste your MongoDB connection string from Step 2

## Step 4: Initialize Database
Once you've set the MONGODB_URI environment variable, the database will be initialized automatically on first use.

For manual initialization, you can run:
```bash
npx ts-node scripts/init-mongodb.ts
```

## Default Credentials

**Admin Login:**
- Username: `admin`
- Password: `12345`

## Database Collections

### users
Stores user information:
- `_id`: MongoDB ObjectId
- `username`: Unique username
- `password`: User password (store securely in production)
- `role`: 'admin' or 'student'
- `email`: User email
- `createdAt`: Timestamp

### sessions
Stores active user sessions:
- `_id`: MongoDB ObjectId
- `sessionId`: Session identifier
- `userId`: Reference to user
- `role`: User role
- `username`: Username
- `createdAt`: Session creation time
- `expiresAt`: Session expiration time (TTL index)

## Important Notes

⚠️ **Security**: In production, passwords should be hashed using bcrypt or similar before storing.

⚠️ **Default Password**: Change the default admin password after first login.

⚠️ **Connection String**: Keep your MongoDB connection string secret. Never commit it to version control.

## Troubleshooting

### Connection Failed
- Verify MONGODB_URI is correctly set in environment variables
- Check that your IP is whitelisted in MongoDB Atlas (Network Access)
- Ensure the connection string includes correct username and password

### Collections Not Created
- The collections are created automatically on first API call
- If needed, you can manually initialize using the script mentioned above

### Slow Performance
- Monitor your MongoDB Atlas cluster for resource usage
- Consider upgrading from M0 sandbox for production use
