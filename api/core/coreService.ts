// @ts-ignore
import { agent } from './coreSetup.ts'

export async function createDid() {
  return await agent.didManagerCreate()
 
}

export async function createVc(holderDid:string,issuerDid:string,name:string,dob:string,address:string) {

  const verifiableCredential = await agent.createVerifiableCredential({
    credential: {
      issuer: { id: issuerDid },
      credentialSubject: {
        name:name,
        dod:dob,
        address:address
      },
    },
    proofFormat: 'jwt',
  })
  console.log(`New credential created`)
  console.log(JSON.stringify(verifiableCredential, null, 2))
  return verifiableCredential
}