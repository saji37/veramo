import { PrismaClient } from '@prisma/client';
import { Connection } from 'pg';
import type { Vcredential } from '@prisma/client'
const prisma = new PrismaClient();


export async function createUser(email: string, password: string, did: string) {
  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        password,
      did
      },
    });

    console.log('User created:', newUser);
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await prisma.$disconnect();
  }
}
export async function findUser(email:string,password:string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        AND: [
          { email: email}, 
          {password:password}
        ],
      },
    });

    console.log('User found:', user); 
    return user
  } catch (error) {
    console.error('Error finding user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function establishConnection(holderid:string,issuerid:string) {
  try {
    const connection = await prisma.connection.create({
      data:{
        holderid,
        issuerid,
      }
    });

    console.log('Connection Established:', connection); 
    return connection
  } catch (error) {
    console.error('Error finding user:', error);
  } finally {
    await prisma.$disconnect();
  }
}


export async function listConnection(id:string) {
  try {
    const connections = await prisma.connection.findFirst({
      where: { holderid: id}
         
    });

    console.log('Connection Found:', connections); 
    return connections;
  } catch (error) {
    console.error('Error finding user:', error);
  } finally {
    await prisma.$disconnect();
  }
}
export async function listCredential(id:string) {
  try {
    const feed = await prisma.$queryRaw<Vcredential[]>`select * from "vcredential" join "connection" on "connectionid"="connection"."id" where "connection"."holderid"=${id}`
    

    console.log('Credentials Found:', feed); 
    return feed;
  } catch (error) {
    console.error('Error finding user:', error);
  } finally {
    await prisma.$disconnect();
  }
}


