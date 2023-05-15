import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function createUser(name:string,email: string, password: string, did: string) {
  try {
    const newUser = await prisma.verifier.create({
      data: {
        name,
        email,
        password,
      did
      },
    });

    console.log('User created:', newUser);
    return newUser
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function findUser(email:string,password:string) {
  try {
    const user = await prisma.verifier.findFirst({
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