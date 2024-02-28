// server.js
const express = require('express');
const Item = require('./models/item');
const Database = require('./Database');
let database;

try {
    // Create a new database instance
    database = new Database({
      host: 'localhost',
      user: 'express',
      password: 'Expre55!',
      database: 'express'
    });

    // Connect to the database
    database.connect();
} catch (error) {
    console.error('Error connecting to the database: ', error);
}

const app = express();
const PORT = process.env.PORT || 5000;

// Define a simple GET endpoint
app.get('/api/data', async (req, res) => {
    try {
      // Retrieve all items from the database
        const items = await database.fetchItems();
        res.json(items);
        
    } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
