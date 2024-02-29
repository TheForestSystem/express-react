const mysql = require('mysql');
const item = require('./models/item');
const User = require('./models/User');

class Database {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.connection.connect(error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  disconnect() {
    return new Promise((resolve, reject) => {
      this.connection.end(error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  fetchItems() {
    return new Promise(async (resolve, reject) => {
      try {
        const results = await this.query('SELECT * FROM items');
        const items = results.map(row => new item(row.id, row.name));
        resolve(items);
      } catch (error) {
        reject(error);
      }
    });
  }

  fetchUser(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const results = await this.query('SELECT * FROM users WHERE uuid = ?', [id]);
        if (results.length === 0) {
          resolve(null);
        } else {
          const row = results[0];
          const user = new User(row.uuid, row.fname, row.lname, row.email, row.password);
          resolve(user);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = Database;
