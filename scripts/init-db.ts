#!/usr/bin/env node

/**
 * MongoDB Database Initialization Script
 * Run this once to set up collections and indexes
 */

import 'dotenv/config'
import { MongoClient } from 'mongodb'
import * as fs from 'fs'
import * as path from 'path'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://juan:Juan11%40@sastro.tsbfaub.mongodb.net/SastroJendro?retryWrites=true&w=majority'

async function initializeDatabase() {
  let client: MongoClient | null = null

  try {
    console.log('🔄 Connecting to MongoDB...')
    client = new MongoClient(MONGODB_URI)
    await client.connect()
    
    const db = client.db('SastroJendro')
    console.log('✓ Connected to MongoDB')

    // Create collections
    console.log('\n📦 Creating collections...')
    
    try {
      await db.createCollection('members')
      console.log('✓ Created members collection')
    } catch (e: any) {
      if (e.codeName !== 'NamespaceExists') throw e
      console.log('ℹ Members collection already exists')
    }

    try {
      await db.createCollection('articles')
      console.log('✓ Created articles collection')
    } catch (e: any) {
      if (e.codeName !== 'NamespaceExists') throw e
      console.log('ℹ Articles collection already exists')
    }

    try {
      await db.createCollection('organization_structure')
      console.log('✓ Created organization_structure collection')
    } catch (e: any) {
      if (e.codeName !== 'NamespaceExists') throw e
      console.log('ℹ Organization structure collection already exists')
    }

    try {
      await db.createCollection('users')
      console.log('✓ Created users collection')
    } catch (e: any) {
      if (e.codeName !== 'NamespaceExists') throw e
      console.log('ℹ Users collection already exists')
    }

    try {
      await db.createCollection('activities')
      console.log('✓ Created activities collection')
    } catch (e: any) {
      if (e.codeName !== 'NamespaceExists') throw e
      console.log('ℹ Activities collection already exists')
    }

    // Create indexes
    console.log('\n🔑 Creating indexes...')

    await db.collection('members').createIndex({ email: 1 }, { unique: true })
    console.log('✓ Created unique index on members.email')

    await db.collection('members').createIndex({ username: 1 }, { unique: true })
    console.log('✓ Created unique index on members.username')

    await db.collection('members').createIndex({ memberId: 1 })
    console.log('✓ Created index on members.memberId')

    await db.collection('articles').createIndex({ slug: 1 }, { unique: true })
    console.log('✓ Created unique index on articles.slug')

    await db.collection('articles').createIndex({ createdAt: -1 })
    console.log('✓ Created index on articles.createdAt')

    await db.collection('users').createIndex({ email: 1 }, { unique: true })
    console.log('✓ Created unique index on users.email')

    await db.collection('activities').createIndex({ memberId: 1 })
    console.log('✓ Created index on activities.memberId')

    await db.collection('activities').createIndex({ createdAt: -1 })
    console.log('✓ Created index on activities.createdAt')

    // List collections
    console.log('\n📋 Collections in database:')
    const collections = await db.listCollections().toArray()
    collections.forEach(col => {
      console.log(`  • ${col.name}`)
    })

    console.log('\n✅ Database initialization complete!')
    console.log('\n📝 Next steps:')
    console.log('  1. Update your API endpoints with MongoDB integration')
    console.log('  2. Create initial admin users if needed')
    console.log('  3. Start your development server: npm run dev')

  } catch (error) {
    console.error('❌ Error initializing database:', error)
    process.exit(1)
  } finally {
    if (client) {
      await client.close()
      console.log('\n🔌 MongoDB connection closed')
    }
  }
}

// Run initialization
initializeDatabase()
