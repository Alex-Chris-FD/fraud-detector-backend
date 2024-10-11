const express = require('express');
const { Pool } = require('pg');

const app = express();

// Add your Postgres database credentials here
const dbConfig = {
  host: 'fraud-results.cjgg8gioeyrk.us-east-1.rds.amazonaws.com',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'fraudteam',
  ssl: {
    rejectUnauthorized: false
  }
};

// Create a connection pool to the database
const pool = new Pool(dbConfig);

app.get('/data', async (req, res) => {
  try {
    // Query the database
    const result = await pool.query('SELECT id, sample_fraud_detection_model_insightscore, rule_id, outcomes FROM fraud_results;');

    // // Print the result to the console
    // console.log('Query result:');
    // console.log(result.rows);

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