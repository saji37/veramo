node version : v18.16.0

1.create DB :

sudo -u postgres psql

CREATE USER user1 WITH PASSWORD 'password';

CREATE DATABASE sample OWNER user1;

\q : TO exit

Generate prisma client : 
npx prisma generate

To run server :  
node --loader ts-node/esm ./api/server.ts