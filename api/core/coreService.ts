// @ts-ignore
import { agent } from './coreSetup.ts'
import Ajv, { JSONSchemaType } from 'ajv';

// Define your custom credential type
interface MyCredentialType {
  name: string;
  dob:string;
  address:string;
}

// Define your JSON Schema
const credentialSchema: JSONSchemaType<MyCredentialType> = {
  type: 'object',
  properties: {
    
    name: { type: 'string' },
    dob:{type:'string'},
    address:{type:'string'}
  },
  required: ['name','dob','address'],
};

// Create an instance of the Ajv validator
const ajv = new Ajv();
const validate = ajv.compile(credentialSchema);


export async function createDid() {
  return await agent.didManagerCreate()
 
}

export async function createVc(issuerDid:string,name:string,dob:string,address:string) {


const isValid = validate({name:name,dob:dob,address:address});

if (isValid) {
  console.log('Credential is valid');
} else {
  console.log('Credential is invalid:', validate.errors);
}
  const verifiableCredential = await agent.createVerifiableCredential({
    credential: {
      type:['AdharCard'],
      issuer: { id: issuerDid },
      credentialSubject: {
        name:name,
        dob:dob,
        address:address
      },
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