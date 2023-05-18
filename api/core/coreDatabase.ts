import pkg from "pg";
const { Client } = pkg;
export const checkDbExists =async () =>{

// const client = new Client({
//   user: "user1",
//   host: 'localhost',
//   password: "password",
//   port: 5432, // default PostgreSQL port
// });

var conString = "postgres://user1:password@localhost:5432/test";
var client = new Client(conString);
try{
await client.connect();
await client.query('CREATE DATABASE my_database OWNER user1');
}
catch{
  console.log("Error while Connecting")
}

// Replace 'your_database_name' with the name of the database you want to create
const databaseName = 'sample1';

var res;
  try{
  res = await client.query(`SELECT datname FROM pg_catalog.pg_database WHERE lower(datname) = lower('test');`)
  console.log(res.rows.length)
  
  if(res.rows.length === 0){
    console.log("Create the DB ")
  }
else{
  await client.query(`CREATE TABLE userdetails(id SERIAL PRIMARY KEY,email VARCHAR(150),password VARCHAR(150),did VARCHAR(150));`);
  await client.query(`CREATE TABLE verifier(id SERIAL PRIMARY KEY,name VARCHAR(150),email VARCHAR(150),password VARCHAR(150),did VARCHAR(150));`);
  await client.query(`CREATE TABLE issuer(id SERIAL PRIMARY KEY,name VARCHAR(150),email VARCHAR(150),password VARCHAR(150),did VARCHAR(150));`);
  await client.query(`CREATE TABLE connection(id SERIAL PRIMARY KEY,holderid VARCHAR(150),issuerid VARCHAR(150));`);
  await client.query(`CREATE TABLE vcredential(id SERIAL PRIMARY KEY,connectionid INT NOT NULL,vc JSONB);`);
 
  
  }
}
  
  catch{
    console.log("Error ...")
  }
  client.end();
}


//   client.query(`SELECT 1 FROM pg_database WHERE datname = '${databaseName}';`, async (err: any, res: { rows: string | any[]; }) => {
//   if (err) {
//     console.error(err);
//   } else {
//     if (res.rows.length === 0) {
//       // Database does not exist, create it
//        client.query(`CREATE DATABASE ${databaseName};`, (err: any, res: any) => {
//         if (err) {
//           console.error(err);
//         } else {
//           console.log(`Database '${databaseName}' created successfully`);
//         }
        
//       });
//      client.query(`CREATE TABLE userdetails(id SERIAL PRIMARY KEY,email VARCHAR(150),password VARCHAR(150),did VARCHAR(150));`, (err: any, res: any) => {
//         if (err) {
//           console.error(err);
//         } else {
//           console.log(`Table userdetails created successfully`);
//         }
        
//       });
//      client.query(`CREATE TABLE verifier(id SERIAL PRIMARY KEY,name VARCHAR(150),email VARCHAR(150),password VARCHAR(150),did VARCHAR(150));`, (err: any, res: any) => {
//         if (err) {
//           console.error(err);
//         } else {
//           console.log(`Table verifier created successfully`);
//         }
        
//       });
//      client.query(`CREATE TABLE issuer(id SERIAL PRIMARY KEY,name VARCHAR(150),email VARCHAR(150),password VARCHAR(150),did VARCHAR(150));`, (err: any, res: any) => {
//         if (err) {
//           console.error(err);
//         } else {
//           console.log(`Table issuer created successfully`);
//         }
        
//       });
//      client.query(`CREATE TABLE connection(id SERIAL PRIMARY KEY,holderid VARCHAR(150),issuerid VARCHAR(150));`, (err: any, res: any) => {
//         if (err) {
//           console.error(err);
//         } else {
//           console.log(`Table connection created successfully`);
//         }
        
//       });
//      client.query(`CREATE TABLE vcredential(id SERIAL PRIMARY KEY,connectionid INT NOT NULL,vc JSONB);`, (err: any, res: any) => {
//         if (err) {
//           console.error(err);
//         } else {
//           console.log(`Table vcredential created successfully`);
//         }
        
//       });
//     } else {
//       // Database already exists
//       console.log(`Database '${databaseName}' already exists`);
//     }
//   }
// });

// client.end();

    
// }

