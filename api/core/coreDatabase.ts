import { Client } from "pg";
export const checkDbExists =() =>{

const client = new Client({
  user: process.env.USER_NAME,
  host: 'localhost',
  password: process.env.PASSWORD,
  port: 5432, // default PostgreSQL port
});

client.connect();

// Replace 'your_database_name' with the name of the database you want to create
const databaseName = 'sample';

client.query(`SELECT 1 FROM pg_database WHERE datname = '${databaseName}';`, (err: any, res: { rows: string | any[]; }) => {
  if (err) {
    console.error(err);
  } else {
    if (res.rows.length === 0) {
      // Database does not exist, create it
      client.query(`CREATE DATABASE ${databaseName};`, (err: any, res: any) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Database '${databaseName}' created successfully`);
        }
        
      });
      client.query(`CREATE TABLE userdetails(id SERIAL PRIMARY KEY,email VARCHAR(150),password VARCHAR(150),did VARCHAR(150));`, (err: any, res: any) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Table userdetails created successfully`);
        }
        
      });
      client.query(`CREATE TABLE verifier(id SERIAL PRIMARY KEY,name VARCHAR(150),email VARCHAR(150),password VARCHAR(150),did VARCHAR(150));`, (err: any, res: any) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Table verifier created successfully`);
        }
        
      });
      client.query(`CREATE TABLE issuer(id SERIAL PRIMARY KEY,name VARCHAR(150),email VARCHAR(150),password VARCHAR(150),did VARCHAR(150));`, (err: any, res: any) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Table issuer created successfully`);
        }
        
      });
      client.query(`CREATE TABLE connection(id SERIAL PRIMARY KEY,holderid VARCHAR(150),issuerid VARCHAR(150));`, (err: any, res: any) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Table connection created successfully`);
        }
        
      });
      client.query(`CREATE TABLE vcredential(id SERIAL PRIMARY KEY,connectionid INT NOT NULL,vc JSONB);`, (err: any, res: any) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Table vcredential created successfully`);
        }
        
      });
    } else {
      // Database already exists
      console.log(`Database '${databaseName}' already exists`);
    }
  }
});

client.end();

    
}
function env(arg0: string): string | undefined {
    throw new Error("Function not implemented.");
}

