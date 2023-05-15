import { PrismaClient } from '@prisma/client';
import { Connection } from 'pg';

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

export async function establishConnection(holderid:number,issuerid:number) {
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


export async function listConnection(id:number) {
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


