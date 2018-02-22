import org.mongodb.scala._
import Helpers._

object PageRank extends App {

  val mongoClient: MongoClient = MongoClient()
  val database: MongoDatabase = mongoClient.getDatabase("pagerank")
  val collection: MongoCollection[Document] = database.getCollection("data")


  val A: Document = Document(
    "_id" -> "A",
    "value" -> Document(
      "url" -> "A",
      "pagerank" -> 1,
      "outlink_list" -> List("B","C")
    )
  )

  val B: Document = Document(
    "_id" -> "B",
    "value" -> Document(
      "url" -> "B",
      "pagerank" -> 1,
      "outlink_list" -> List("C")
    )
  )

  val C: Document = Document(
    "_id" -> "C",
    "value" -> Document(
      "url" -> "C",
      "pagerank" -> 1,
      "outlink_list" -> List("A")
    )
  )

  val D: Document = Document(
    "_id" -> "D",
    "value" -> Document(
      "url" -> "D",
      "pagerank" -> 1,
      "outlink_list" -> List("C")
    )
  )

  collection.insertOne(A).results();
  collection.insertOne(B).results();
  collection.insertOne(C).results();
  collection.insertOne(D).results();


}
