const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017/";
const dbName = "408631082";
const collectionName = "studentslist";

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

        // Add random absenceCount for each student
        const updatedStudents = students.map(student => {
            student.absenceCount = Math.floor(Math.random() * 6); // 隨機生成 0～5 的數字
            return student;
        });

        // Update database with new absenceCount
        const bulkOperations = updatedStudents.map(student => ({
            updateOne: {
                filter: { _id: student._id },
                update: { $set: { absenceCount: student.absenceCount } }
            }
        }));
        await collection.bulkWrite(bulkOperations);
        console.log("成功更新所有學生的缺席次數！");

        // Display results
        console.log("更新後的學生資料：");
        updatedStudents.forEach(student => {
            console.log(student);
        });

    } catch (error) {
        console.error("發生錯誤：", error);
    } finally {
        // Close connection
        await client.close();
        console.log("已關閉 MongoDB 連接");
    }
})();
