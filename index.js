const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

require('dotenv').config();

const app = express();
app.use(express.json()); 
app.use(cors()); 

// Konfigurasi PostgreSQL
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

app.get('/menus', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM menu');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching menus:', err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/orders', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "order"');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching orders:', err.message);
        res.status(500).send('Server Error');
    }
});

// Jalankan server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
