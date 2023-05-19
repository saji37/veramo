import pkg from "pg";
const { Client } = pkg;
export const checkDbExists =async () =>{

// const client = new Client({
//   user: "user1",
//   host: 'localhost',
//   password: "password",
//   port: 5432, // default PostgreSQL port
// });

var conString = process.env.DATABASE_URL;
// console.log(conString)
var client = new Client(conString);
try{
await client.connect();
}
catch{
  console.log("Error while Connecting")
}

// Replace 'your_database_name' with the name of the database you want to create


var res;
  try{
  res = await client.query(`SELECT datname FROM pg_catalog.pg_database WHERE lower(datname) = lower('${process.env.DB}');`)
  if(res.rows.length === 0){
    console.log("Create the DB ...")
  }
else{
  await client.query(`CREATE TABLE credentialschema(id SERIAL PRIMARY KEY,issuerid VARCHAR(150),name VARCHAR(150),schema TEXT[]);`);
  console.log('Schema table is created ...')
  await client.query(`CREATE TABLE userdetails(id SERIAL PRIMARY KEY,email VARCHAR(150),password VARCHAR(150),did VARCHAR(150));`);
  await client.query(`CREATE TABLE verifier(id SERIAL PRIMARY KEY,name VARCHAR(150),email VARCHAR(150),password VARCHAR(150),did VARCHAR(150));`);
  await client.query(`CREATE TABLE issuer(id SERIAL PRIMARY KEY,name VARCHAR(150),email VARCHAR(150),password VARCHAR(150),did VARCHAR(150));`);
  await client.query(`CREATE TABLE connection(id SERIAL PRIMARY KEY,holderid VARCHAR(150),issuerid VARCHAR(150));`);
  await client.query(`CREATE TABLE vcredential(id SERIAL PRIMARY KEY,connectionid INT NOT NULL,vc JSONB);`);
 
  
  }
}
  
  catch{
    console.log("Tables already created ...")
  }
  client.end();
}

