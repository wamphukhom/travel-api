const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
require('dotenv').config();
const app = express();

const client = new Client(process.env.DATABASE_URL);

client.connect()
    .then(() => {
        console.log('เชื่อมต่อกับฐานข้อมูลสำเร็จแล้ว');

        // ทำคำสั่ง SQL หรือการเรียกใช้งานในนี้
        // เช่น client.query('SELECT * FROM users', (err, result) => { ... })
        // หรือใช้ async/await สำหรับ Promise-based queries
    })
    .catch((err) => {
        console.error('ไม่สามารถเชื่อมต่อกับฐานข้อมูลได้:', err.message);
    });

app.use(cors())

app.get('/', (req, res) => {
    console.log('hello world');
    res.send('hello world');
});

app.get('/attractions', (req, res) => {
    const query = 'SELECT * FROM products;';

    client.query(query)
        .then((result) => {
            const rows = result.rows;
            console.log('ข้อมูลที่ได้:', rows);
            res.send(rows);
        })
        .catch((err) => {
            console.error('ไม่สามารถดึงข้อมูลจากตารางได้:', err.message);
        })
        .finally(() => {
            // ปิดการเชื่อมต่อกับฐานข้อมูลเมื่อเสร็จสิ้นการทำงาน
            client.end();
        });
})

app.listen(process.env.PORT || 3000)

// npm install cors เพื่อให้เรียกจาก api อื่นได้
// npm install express --save
// npm nodemon