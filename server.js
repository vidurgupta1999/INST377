// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
//import countries from "./public/lab_6/countries.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const dbSettings = {
  filename: './tmp/database.db',
  driver: sqlite3.Database
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.route('/sql')
  .get((req, res) => {
    console.log('GET detected');
  })
  .post(async (req, res) => {
    console.log('POST request detected');
    console.log('Form data in res.body', req.body);
    // This is where the SQL retrieval function will be:
    // Please remove the below variable
		const db = await open(dbSettings);
    const output = await query(db);
    // This output must be converted to SQL
    res.json(output);
  });


  async function dataFetch() {
    const url = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";
    const response = await fetch(url);
  
    return response.json()
  
  }

  async function databaseInitialize(dbSettings) {
    try {
      const db = await open(dbSettings);
      await db.exec(`CREATE TABLE IF NOT EXISTS restaurants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        restaurant_name TEXT,
        category TEXT)
        `)
  
      const data = await dataFetch();
      data.forEach((entry) => { insertIntoDB(entry) });
  
  
      const test = await db.get("SELECT * FROM restaurants")
      console.log(test);
  
    }
    catch(e) {
      console.log("Error loading Database");
      console.log(e);
  
    }
  }
  
  async function query(db) {
    const result = await db.all(`SELECT category, COUNT(restaurant_name) FROM restaurants GROUP BY category`);
    return result;
  }


async function insertIntoDB(data) {
	try {
		const restaurant_name = data.name;
		const category = data.category;

		await db.exec(`INSERT INTO restaurants (restaurant_name, category) VALUES ("${restaurant_name}", "${category}")`);
		console.log(`${restaurant_name} and ${category} inserted`);
		}

	catch(e) {
		console.log('Error on insertion');
		console.log(e);
		}

}  
  console.log(`Example app listening on port ${port}!`);
});


