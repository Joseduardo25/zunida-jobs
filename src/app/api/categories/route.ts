import MongoModel from '../../../models/mongo'
import MongoHelper from '../../../models/mongo_helper'
import { NextRequest, NextResponse } from 'next/server'

// Simulated database
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = searchParams.get('limit') 
    ? parseInt(searchParams.get('limit') as string) 
    : users.length

    var mongoModel = null
    const mongoClientDB = new MongoHelper()
    await mongoClientDB.connect()
    mongoModel = new MongoModel(mongoClientDB.getDB())

    let categories = await mongoModel.getAll('categories')
  console.log('categories: ', categories)
  return NextResponse.json(
    categories,
    { 
      status: 200,
      headers: {
        'X-Total-Count': users.length.toString()
      }
    }
  )
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newUser = {
      id: users.length + 1,
      name: body.name
    }

    users.push(newUser)

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid user data' }, 
      { status: 400 }
    )
  }
}