// @ts-ignore
import { getSchema } from './coreDatabase.ts';
// @ts-ignore
import { agent } from './coreSetup.ts'
import Ajv, { JSONSchemaType } from 'ajv';
import { checkSchema } from './schemaAdd.js';



// Define your custom credential type
// interface MyCredentialType {
//   name: string;
//   dob:string;
//   address:string;
// }

// // Define your JSON Schema
// const credentialSchema: JSONSchemaType<MyCredentialType> = {
//   type: 'object',
//   properties: {
    
//     name: { type: 'string' },
//     dob:{type:'string'},
//     address:{type:'string'}
//   },
//   required: ['name','dob','address'],
// };

// // Create an instance of the Ajv validator
// const ajv = new Ajv();
// const validate = ajv.compile(credentialSchema);


export async function createDid() {
  return await agent.didManagerCreate()
 
}


export async function createVc(schemaid:string,issuerDid:string,data:any) {
const schema = await getSchema(parseInt(schemaid));
console.log(schema);
const validate=checkSchema(schema?.schema,data)


  const verifiableCredential = await agent.createVerifiableCredential({
    credential: {
      type:[`${schema?.name}`],
      issuer: { id: issuerDid },
      credentialSubject: data
    },
    proofFormat: 'jwt',
  })
  // console.log(`New credential created`)
  // console.log(JSON.stringify(verifiableCredential, null, 2))
  return verifiableCredential
}

export async function verifyVc(cred:any) {
  const result = await agent.verifyCredential({
    credential: cred
  })
  console.log(`Credential verified`, result.verified)
  return result.verified
}