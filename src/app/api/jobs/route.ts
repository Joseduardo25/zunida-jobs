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

  let jobs = await mongoModel.getAll('jobs')
  console.log('jobs: ', jobs)
  return NextResponse.json(
    jobs,
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

    var mongoModel = null
    const mongoClientDB = new MongoHelper()
    await mongoClientDB.connect()
    mongoModel = new MongoModel(mongoClientDB.getDB())

    const updatedPayload = {
      ...body,
      date: new Date(),
    }

    const jobs = await mongoModel.create('jobs', updatedPayload)
    console.log('jobs: ', jobs)

    return NextResponse.json(jobs, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid user data' }, 
      { status: 400 }
    )
  }
}