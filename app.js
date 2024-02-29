// server.js
const express = require('express');
const fs = require('fs');
const gravatar = require('gravatar');
const axios = require('axios');

const Item = require('./models/item');
const User = require('./models/User');
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

app.get('/api/user/avatar/:id', async (req, res) => {
  try {
      const user = await database.fetchUser(req.params.id);
      if (!user) {
          res.status(404).json({ error: 'User not found' });
          return;
      }

      const avatarUrl = gravatar.url(user.email, { protocol: 'https', s: '200', d: '404' });

      // Stream the image directly from Gravatar to the client's response
      axios({
          method: 'get',
          url: avatarUrl,
          responseType: 'stream'
      }).then(response => {
          response.data.pipe(res);
      }).catch(error => {
          // Handle errors
          console.error('Error fetching avatar:', error);
          res.status(500).json({ error: 'Internal server error' });
      });
  } catch (error) {
      console.error('Error fetching avatar:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/user/:id', async (req, res) => {
  try {
      const user = await database.fetchUser(req.params.id);
      if (!user) {
          res.status(404).json({ error: 'User not found' });
          return;
      }

      res.json(user);
  } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
