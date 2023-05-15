// @ts-ignore
import { agent } from './coreSetup.ts'

export async function createDid() {
  return await agent.didManagerCreate()
 
}