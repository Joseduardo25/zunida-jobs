class MongoModel {
  constructor(db) {
    this.db = db
  }

  getAllFilter(collection, query, order, fields) {
    return this.db
      .collection(collection)
      .find(query, {
        fields,
      })
      .sort(order)
      .toArray()
  }

  getAll(collection, query, order) {
    return this.db.collection(collection).find(query).sort(order).toArray()
  }

  get(collection, query) {
    return this.db.collection(collection).findOne(query)
  }

  getWithLookup(options) {
    const {
      fromCollection,  // Colección principal de la que queremos obtener datos
      query,          // Query para filtrar la colección principal
      lookups = []    // Array de configuraciones de lookup
    } = options;

    const pipeline = [
      {
        $match: query
      }
    ];

    // Añadir los lookups al pipeline
    lookups.forEach(lookup => {
      pipeline.push({
        $lookup: {
          from: lookup.from,
          localField: lookup.localField,
          foreignField: lookup.foreignField || '_id',
          as: lookup.as
        }
      });

      // Si queremos convertir el array en objeto
      if (lookup.unwind !== false) {
        pipeline.push({
          $unwind: {
            path: `$${lookup.as}`,
            preserveNullAndEmptyArrays: true // Mantener documentos aunque no haya match
          }
        });
      }
    });

    return this.db.collection(fromCollection)
      .aggregate(pipeline)
      .toArray();
}

  count(collection, query) {
    return this.db.collection(collection).count(query)
  }

  create(collection, query) {
    return this.db.collection(collection).insertOne(query, {
      upsert: true,
      returnNewDocument: true,
    })
  }

  update(collection, filter, data) {
    return this.db.collection(collection).updateOne(
      filter,
      {
        $set: data,
      }
    )
  }

  findAndUpdate(collection, filter, data) {
    return this.db.collection(collection).findOneAndUpdate(
      filter,
      data,
      {
        upsert: false, // insert a new document, if no existing document match the query 
        returnOriginal: false,
      }
    )
  }

  aggregate(collection, query) {
    return this.db.collection(collection).aggregate(query).toArray()
  }
}

module.exports = MongoModel
