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

        // Calculate department count
        const departmentCount = students.reduce((acc, student) => {
            const 院系 = student.院系; // 假設學生資料中有 `department` 欄位
            if (院系) {
                acc[院系] = (acc[院系] || 0) + 1;
            }
            return acc;
        }, {});

        // Display results
        console.log("科系人數統計：");
        Object.entries(departmentCount).forEach(([院系, count]) => {
            console.log(`科系：${院系}, 人數：${count}`);
        });
    } catch (error) {
        console.error("發生錯誤：", error);
    } finally {
        // Close connection
        await client.close();
        console.log("已關閉 MongoDB 連接");
    }
})();
