const fs = require('fs');
const csv = require('csv-parser');
const {MongoClient}=require('mongodb');

const uri="mongodb://localhost:27017";
const dbName="408631082";
const collectionName="studentslist";

(async () => {
    const client = new MongoClient(uri);
  
    try {
      // Connect to MongoDB
      await client.connect();
      console.log("成功連接到 MongoDB");
  
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
  
      // Query all student data
      const students = await collection.find().toArray();
  
      // Display results
      console.log("學生資料列表: ");
      students.forEach(student => {
        console.log(student);
      });
    } catch (error) {
      console.error("發生錯誤: ", error);
    } finally {
      // Close connection
      await client.close();
      console.log("已斷開 MongoDB 連接");
    }
  })();
  