import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function createUser(name:string,email: string, password: string, did: string) {
  try {
    const newUser = await prisma.issuer.create({
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
    const user = await prisma.issuer.findFirst({
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

export async function findHolder(id:number) {
  try {
    const user = await prisma.user.findFirst({
      where: 
          {id:id}
    });

    console.log('User found:', user); 
    return user
  } catch (error) {
    console.error('Error finding user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function addVc(connectionid:number,vc:any) {
  try {
    const newVc = await prisma.vcredential.create({
      data: {
        connectionid,
        vc,
      },
    });

    console.log('VC created:', newVc);
    return newVc;
  } catch (error) {
    console.error('Error creating Vc:', error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function checkIfExist(email:string) {
  try {
    const user = await prisma.issuer.findFirst({
     where: { email:email},
     select:{
      email:true
     }
    });
    console.log('User found:', user);
    return user
  } catch (error) {
    console.error('Error finding user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function createSchema(issuerid:string,name: string, schema:any) {
  try {
    const newSchema = await prisma.credentialSchema.create({
      data: {
      issuerid,
      name,
      schema
      },
    });
    return newSchema
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await prisma.$disconnect();
  }
}