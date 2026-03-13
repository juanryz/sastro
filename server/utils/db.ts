import { MongoClient, Db } from 'mongodb'

let db: Db | null = null

export async function connectDB(): Promise<Db> {
  if (db) return db

  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error('MONGODB_URI environment variable not set')
  }

  try {
    const client = new MongoClient(uri)
    await client.connect()
    db = client.db('SastroJendro')
    
    console.log('✓ Connected to MongoDB')
    return db
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error)
    throw error
  }
}

export function getDB(): Db {
  if (!db) {
    throw new Error('Database not connected. Call connectDB() first.')
  }
  return db
}
