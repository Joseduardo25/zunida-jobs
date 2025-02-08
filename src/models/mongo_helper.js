/* eslint-disable prefer-destructuring */
const { MongoClient } = require('mongodb')
const { MONGO_URL: URI, MONGO_DB: DB_NAME } = process.env

class MongoHelper {
  constructor() {
    this.client = null
    this.dbName = DB_NAME
    this.session = null
  }

  async connect() {
    this.client = await MongoClient.connect(URI)
  }

  getDB() {
    return this.client.db(DB_NAME)
  }

  async close() {
    if (this.client) {
      await this.client.close()
    }
  }

  // startTransaction() {
  // 	this.session = this.client.startSession()
  // 	this.session.startTransaction()
  // }

  // async commitTransaction() {
  // 	await this.session.commitTransaction()
  // 	this.session.endSession()
  // }

  // async abortTransaction() {
  // 	// If an error occurred, abort the whole transaction and
  // 	// undo any changes that might have happened
  // 	if (this.session) {
  // 		await this.session.abortTransaction()
  // 		this.session.endSession()
  // 	}
  // }

  // getSession() {
  // 	return this.session
  // }

  // getOptions() {
  // 	return {
  // 		session: this.session,
  // 		returnOriginal: false
  // 	}
  // }
}

module.exports = MongoHelper
