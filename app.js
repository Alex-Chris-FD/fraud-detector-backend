require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');

const app = express();

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'false' ? false : true
  }
};

// Create a connection pool to the database
const pool = new Pool(dbConfig);

app.get('/data', async (req, res) => {
  try {
    // Query the database
    const result = await pool.query('SELECT id, sample_fraud_detection_model_insightscore, rule_id, outcomes FROM fraud_results;');

    // Return the result as JSON
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching data:', err.message);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

module.exports = app;